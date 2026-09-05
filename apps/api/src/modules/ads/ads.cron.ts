import cron from 'node-cron';
import { prisma } from '../../config/database';
import { NotificationType, AdStatus } from '../../generated/prisma';
import { WebsiteService } from '../website/website.service';

export const initAdsCron = () => {
  // Run once a day at midnight
  cron.schedule('0 0 * * *', async () => {
    try {
      console.log('Running scheduled job: Check for expired ads');

      const now = new Date();

      // Find active ads where endDate has passed
      const expiredAds = await prisma.ad.findMany({
        where: {
          status: 'ACTIVE' as AdStatus,
          endDate: {
            lt: now,
          },
        },
      });

      if (expiredAds.length === 0) {
        return;
      }

      console.log(`Found ${expiredAds.length} expired ads. Updating status to INACTIVE...`);

      // We need to update each ad and create a notification
      let cacheInvalidated = false;

      for (const ad of expiredAds) {
        // Update status
        await prisma.ad.update({
          where: { id: ad.id },
          data: { status: 'INACTIVE' as AdStatus },
        });

        // Create notification
        await prisma.notification.create({
          data: {
            title: 'Ad Expired',
            message: `The ad "${ad.name}" has crossed its end date and is now inactive.`,
            type: 'WARNING' as NotificationType,
            link: '/dashboard/ads',
            userId: ad.createdBy,
          },
        });
        
        cacheInvalidated = true;
      }

      if (cacheInvalidated) {
        WebsiteService.invalidateCache().catch((err) =>
          console.error('Failed to invalidate website cache on ad expiration:', err)
        );
      }

      console.log('Expired ads processed successfully.');
    } catch (error) {
      console.error('Error in ads expiration cron job:', error);
    }
  });
};
