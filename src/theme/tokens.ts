export const colors = {
  background: '#F8F4EF', surface: '#FFFDFA', ink: '#261711', espresso: '#482519',
  coffee: '#643923', latte: '#E8D7C5', muted: '#87786F', line: '#E9E0D7',
  gold: '#B78954', success: '#3C765D', pale: '#F2E9E1', white: '#FFFFFF',
};
export const font = {
  display: 'PlayfairDisplay_700Bold', displayMedium: 'PlayfairDisplay_600SemiBold',
  body: 'DMSans_400Regular', medium: 'DMSans_500Medium', semibold: 'DMSans_600SemiBold',
  bold: 'DMSans_700Bold', extra: 'DMSans_800ExtraBold',
};
export const currency = (n: number) => n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
