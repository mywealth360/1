// Robot links and resources

export const resourceLinks = {
  packStarter: 'https://mega.nz/folder/c1BT2YzK#fErvdTnzOE42SJ3WWQcZ8g',
  packGlobal: 'https://mega.nz/folder/BsZwCSCb#yAo4P_SSp8v7q3EEoJ3nnA',
  packPro: 'https://mega.nz/folder/1lYiSAoT#8kZ4I9SewZK8N09StrvOYQ',
  copyInvestWaitlist: 'https://form.respondi.app/MnbrQZ6E',
  grPro: 'https://mega.nz/folder/1lYiSAoT#8kZ4I9SewZK8N09StrvOYQ',
  backtest: 'https://mega.nz/folder/1lYiSAoT#8kZ4I9SewZK8N09StrvOYQ',
  manualActivation: 'https://heyzine.com/flip-book/85263048b0.html',
  videoTutorial: 'https://www.youtube.com/watch?v=0uajKLBp6mM',
};

export const stripeLinks = {
  packStarter: 'https://buy.stripe.com/test_28o5mz0Ht0Hl0yk5kk',
  packGlobal: 'https://buy.stripe.com/test_28o5mz0Ht0Hl0yk5kl',
  packPro: 'https://buy.stripe.com/test_28o5mz0Ht0Hl0yk5km',
  copyInvest: 'https://buy.stripe.com/test_28o5mz0Ht0Hl0yk5kn',
  grPro: 'https://buy.stripe.com/test_28o5mz0Ht0Hl0yk5ko',
  backtest: 'https://buy.stripe.com/test_28o5mz0Ht0Hl0yk5kp',
};

export const whatsappLinks = {
  support: 'https://wa.me/message/A4462RJPMX34K1',
  sales: 'https://wa.me/message/A4462RJPMX34K1',
  group: 'https://chat.whatsapp.com/JXjuONxu6Vu0WnLYYaUeIj',
};

export const demoScheduleLink = 'https://calendly.com/profitestrategista/30min';

export const robotLinks = {
  takeGo: 'https://mega.nz/folder/c1BT2YzK#fErvdTnzOE42SJ3WWQcZ8g',
  take33: 'https://mega.nz/folder/c1BT2YzK#fErvdTnzOE42SJ3WWQcZ8g',
  take40: 'https://mega.nz/folder/c1BT2YzK#fErvdTnzOE42SJ3WWQcZ8g',
  armadilha: 'https://mega.nz/folder/c1BT2YzK#fErvdTnzOE42SJ3WWQcZ8g',
  cb: 'https://mega.nz/folder/c1BT2YzK#fErvdTnzOE42SJ3WWQcZ8g',
  vReversao: 'https://mega.nz/folder/c1BT2YzK#fErvdTnzOE42SJ3WWQcZ8g',
  pivotHunter: 'https://mega.nz/folder/1lYiSAoT#8kZ4I9SewZK8N09StrvOYQ',
  trapHunter: 'https://mega.nz/folder/1lYiSAoT#8kZ4I9SewZK8N09StrvOYQ',
  elephantHunter: 'https://mega.nz/folder/1lYiSAoT#8kZ4I9SewZK8N09StrvOYQ',
  estoHunter: 'https://mega.nz/folder/1lYiSAoT#8kZ4I9SewZK8N09StrvOYQ',
  fiboHunter: 'https://mega.nz/folder/1lYiSAoT#8kZ4I9SewZK8N09StrvOYQ',
  grGlobal: 'https://mega.nz/folder/BsZwCSCb#yAo4P_SSp8v7q3EEoJ3nnA',
  crypto: 'https://mega.nz/folder/BsZwCSCb#yAo4P_SSp8v7q3EEoJ3nnA',
  stocks: 'https://mega.nz/folder/BsZwCSCb#yAo4P_SSp8v7q3EEoJ3nnA',
};

export function getRobotLink(robotName: string): string {
  const normalizedName = robotName.toLowerCase().replace(/\s+/g, '');
  
  // Map normalized names to robot links
  const linkMap: Record<string, string> = {
    'takego': robotLinks.takeGo,
    'take33': robotLinks.take33,
    'take40': robotLinks.take40,
    'armadilha': robotLinks.armadilha,
    'cb': robotLinks.cb,
    'vreversao': robotLinks.vReversao,
    'pivothunter': robotLinks.pivotHunter,
    'traphunter': robotLinks.trapHunter,
    'elephanthunter': robotLinks.elephantHunter,
    'estohunter': robotLinks.estoHunter,
    'fibohunter': robotLinks.fiboHunter,
    'grglobal': robotLinks.grGlobal,
    'crypto': robotLinks.crypto,
    'stocks': robotLinks.stocks,
  };
  
  return linkMap[normalizedName] || resourceLinks.packStarter;
}