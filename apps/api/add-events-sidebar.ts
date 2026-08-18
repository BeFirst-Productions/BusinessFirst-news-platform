import { prisma } from './src/config/database';
import RedisClient from './src/config/redis';

async function main() {
  // 1. Add to ui_sidebar_navigation
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'ui_sidebar_navigation' }
  });

  if (setting && setting.value) {
    const navItems = setting.value as any[];
    const hasEvents = navItems.find((item) => item.code === 'EVENTS');
    if (!hasEvents) {
      // insert Events after Categories
      const categoriesIndex = navItems.findIndex(item => item.code === 'CATEGORIES');
      const insertIndex = categoriesIndex !== -1 ? categoriesIndex + 1 : navItems.length;
      
      navItems.splice(insertIndex, 0, {
        code: 'EVENTS',
        title: 'Events',
        icon: 'Calendar',
        visible: true
      });
      
      await prisma.siteSetting.update({
        where: { key: 'ui_sidebar_navigation' },
        data: { value: navItems }
      });
      console.log('Successfully added EVENTS to ui_sidebar_navigation!');
    } else {
      console.log('EVENTS already exists in ui_sidebar_navigation.');
    }
  }

  // 2. Also enable in feature_flags just in case
  const flagsSetting = await prisma.siteSetting.findUnique({
    where: { key: 'ui_feature_flags' }
  });

  if (flagsSetting && flagsSetting.value) {
    const flags = flagsSetting.value as any;
    if (flags.events === undefined) {
      flags.events = true;
      await prisma.siteSetting.update({
        where: { key: 'ui_feature_flags' },
        data: { value: flags }
      });
      console.log('Successfully enabled events in ui_feature_flags!');
    }
  }

  // 3. Clear Redis cache
  try {
    await RedisClient.del('settings:public');
    await RedisClient.del('settings:all');
    console.log('Successfully cleared Redis cache for settings.');
  } catch (err) {
    console.error('Failed to clear Redis cache', err);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    // RedisClient is usually a static class that might hold a connection, we can exit explicitly
    process.exit(0);
  });
