'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, User } from '@/store/auth.store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Label } from '@/components/ui/Label';
import {
  User as UserIcon,
  Mail,
  Shield,
  Key,
  Upload,
  Camera,
  Trash2,
  RefreshCw,
  FileText,
  Lock,
  ArrowLeft,
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { API_URL } from '@/lib/constants';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const router = useRouter();
  const { user, refreshProfile } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile forms state
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  // Sync initial user details when store changes
  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio || '');
      setAvatar(user.avatar || '');
    }
  }, [user]);

  // Handle avatar upload to Cloudinary
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 2MB for avatars)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Avatar file size must not exceed 2MB.');
      return;
    }

    setIsUploadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append('files', file);

      const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const response = await fetch(`${API_URL}/media/upload`, {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: formData,
      });

      const resData = await response.json();

      if (response.ok && resData.success && resData.data?.[0]?.url) {
        const uploadedUrl = resData.data[0].url;
        setAvatar(uploadedUrl);
        
        // Auto-save the profile with the new avatar immediately
        await apiClient.put('/auth/profile', { avatar: uploadedUrl });
        await refreshProfile();
        toast.success('Profile avatar updated successfully');
      } else {
        throw new Error(resData.message || 'Upload failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload profile picture');
      console.error('Avatar upload error:', error);
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Remove avatar
  const handleRemoveAvatar = async () => {
    try {
      setIsUploadingAvatar(true);
      await apiClient.put('/auth/profile', { avatar: '' });
      setAvatar('');
      await refreshProfile();
      toast.success('Avatar removed successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to remove avatar');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Save profile updates
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    setIsSavingProfile(true);
    try {
      await apiClient.put('/auth/profile', {
        name: name.trim(),
        bio: bio.trim(),
        avatar,
      });
      await refreshProfile();
      toast.success('Profile details updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save profile');
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Change password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: typeof passwordErrors = {};

    if (!currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (currentPassword) {
      if (newPassword.length < 8) {
        errors.newPassword = 'New password must be at least 8 characters long';
      }
      if (newPassword !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setIsChangingPassword(true);
    try {
      await apiClient.post('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordErrors({});
      toast.success('Password changed successfully');
    } catch (error: any) {
      setCurrentPassword('');
      const apiMessage = error.response?.data?.message || 'Failed to change password';
      if (apiMessage.toLowerCase().includes('current password')) {
        setPasswordErrors({ currentPassword: 'The password you entered is incorrect' });
      } else {
        toast.error(apiMessage);
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Role Badge Styling helper
  const getRoleBadge = (role?: User['role']) => {
    switch (role) {
      case 'SUPERADMIN':
        return <Badge className="bg-red-500 hover:bg-red-600 text-white font-bold border-0">Super Admin</Badge>;
      case 'ADMIN':
        return <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold border-0">Admin</Badge>;
      default:
        return <Badge className="bg-slate-600 hover:bg-slate-700 text-white font-medium border-0">Editor</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b pb-5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => router.push('/dashboard')}
          className="h-9 w-9 rounded-full border"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Account Profile</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Manage your personal account details, biography, and security preferences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Summary Card */}
        <div className="space-y-6">
          <Card className="shadow-sm border">
            <CardContent className="pt-8 pb-6 flex flex-col items-center text-center">
              
              {/* Avatar Upload Frame */}
              <div className="relative group cursor-pointer w-28 h-28 mb-4">
                <div className="w-full h-full rounded-full border-2 border-primary/20 overflow-hidden bg-muted flex items-center justify-center shadow-inner">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <UserIcon className="h-12 w-12 text-muted-foreground/60" />
                  )}
                </div>
                {isUploadingAvatar ? (
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                    <RefreshCw className="h-6 w-6 text-white animate-spin" />
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white"
                  >
                    <Camera className="h-6 w-6 mb-1" />
                    <span className="text-[10px] font-semibold">Change</span>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarUpload}
                  accept="image/*"
                  className="hidden"
                  disabled={isUploadingAvatar}
                />
              </div>

              {/* Action buttons below avatar */}
              {avatar && !isUploadingAvatar && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-destructive hover:bg-destructive/10 h-7 px-2 mb-2"
                  onClick={handleRemoveAvatar}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Remove Photo
                </Button>
              )}

              {/* Name & Credentials */}
              <h2 className="text-xl font-bold text-foreground mt-2">{name || 'Your Name'}</h2>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" />
                {user?.email}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                {getRoleBadge(user?.role)}
              </div>

              {/* Bio Summary */}
              {bio && (
                <div className="mt-6 w-full border-t pt-4 text-left">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">
                    Bio / About Me
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed break-words italic">
                    "{bio}"
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Module Permissions Info Card */}
          <Card className="shadow-sm border">
            <CardHeader className="py-4 border-b">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Module Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {user?.role === 'SUPERADMIN' ? (
                <div className="p-3 bg-red-500/5 text-red-700 dark:text-red-400 border border-red-200/50 rounded-lg text-xs leading-relaxed">
                  <strong>Full Global Access:</strong> As a Super Administrator, you hold full permissions across all dashboard modules.
                </div>
              ) : user?.modules && user.modules.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground mb-3">
                    Your assigned module access permissions:
                  </p>
                  <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1">
                    {user.modules.map((m) => (
                      <div
                        key={m.id}
                        className="flex justify-between items-center p-2 rounded-lg border text-xs bg-muted/30"
                      >
                        <span className="font-semibold text-foreground">{m.module.code}</span>
                        <div className="flex gap-1">
                          {m.canView && <Badge className="text-[10px] py-0 px-1 bg-emerald-100 text-emerald-800 border-0">View</Badge>}
                          {m.canCreate && <Badge className="text-[10px] py-0 px-1 bg-blue-100 text-blue-800 border-0">Create</Badge>}
                          {m.canEdit && <Badge className="text-[10px] py-0 px-1 bg-amber-100 text-amber-800 border-0">Edit</Badge>}
                          {m.canDelete && <Badge className="text-[10px] py-0 px-1 bg-red-100 text-red-800 border-0">Delete</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground text-xs">
                  No active module permissions configured.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Configuration Forms */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Edit Profile details */}
          <Card className="shadow-sm border">
            <CardHeader className="border-b py-4 px-5">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSaveProfile} className="space-y-4">
                
                <Input
                  label="Display Name"
                  placeholder="Enter display name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="space-y-1.5">
                  <Label htmlFor="bio-textarea">Bio / Profile Description</Label>
                  <textarea
                    id="bio-textarea"
                    placeholder="Tell us about yourself..."
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    maxLength={500}
                  />
                  <p className="text-[10px] text-muted-foreground text-right">
                    {bio.length}/500 characters
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    loading={isSavingProfile}
                    disabled={isSavingProfile}
                    leftIcon={<FileText className="h-4 w-4" />}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Card 2: Security settings (Change password) */}
          <Card className="shadow-sm border">
            <CardHeader className="border-b py-4 px-5">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleChangePassword} className="space-y-4">
                
                 <Input
                  type="password"
                  label="Current Password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCurrentPassword(val);
                    if (!val) {
                      setNewPassword('');
                      setConfirmPassword('');
                    }
                    setPasswordErrors(prev => ({ ...prev, currentPassword: undefined }));
                  }}
                  error={passwordErrors.currentPassword}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="password"
                    label="New Password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setPasswordErrors(prev => ({ ...prev, newPassword: undefined }));
                    }}
                    helperText="Password must be at least 8 characters."
                    error={passwordErrors.newPassword}
                    disabled={!currentPassword}
                  />
                  <Input
                    type="password"
                    label="Confirm New Password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setPasswordErrors(prev => ({ ...prev, confirmPassword: undefined }));
                    }}
                    error={passwordErrors.confirmPassword}
                    disabled={!currentPassword}
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="outline"
                    loading={isChangingPassword}
                    disabled={isChangingPassword}
                    leftIcon={<Lock className="h-4 w-4" />}
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
