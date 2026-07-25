import { prisma } from './src/config/database';

async function main() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'ui_sidebar_navigation' }
  });

  if (setting && setting.value) {
    const navItems = setting.value as any[];
    const hasContacts = navItems.find((item) => item.code === 'CONTACTS');
    if (!hasContacts) {
      // insert Contacts after Newsletter
      const newsletterIndex = navItems.findIndex(item => item.code === 'NEWSLETTER');
      const insertIndex = newsletterIndex !== -1 ? newsletterIndex + 1 : navItems.length;
      
      navItems.splice(insertIndex, 0, {
        code: 'CONTACTS',
        title: 'Contacts',
        icon: 'MessageSquare',
        visible: true
      });
      
      await prisma.siteSetting.update({
        where: { key: 'ui_sidebar_navigation' },
        data: { value: navItems }
      });
      console.log('Successfully added CONTACTS to ui_sidebar_navigation!');
    } else {
      console.log('CONTACTS already exists in ui_sidebar_navigation.');
    }
  }

  // Also enable in feature_flags just in case
  const flagsSetting = await prisma.siteSetting.findUnique({
    where: { key: 'ui_feature_flags' }
  });

  if (flagsSetting && flagsSetting.value) {
    const flags = flagsSetting.value as any;
    if (flags.contacts === undefined) {
      flags.contacts = true;
      await prisma.siteSetting.update({
        where: { key: 'ui_feature_flags' },
        data: { value: flags }
      });
      console.log('Successfully enabled contacts in ui_feature_flags!');
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
