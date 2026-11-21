# Cafeteria CIDOCA ☕

Aplicativo de cafeteria em **React Native + Expo + TypeScript**. Interface em português brasileiro, baseada na nova referência fornecida pelo usuário (estética creme/marrom, cafeteria premium).

## Executar no VS Code

```powershell
git switch feat/premium-food-ui
git pull origin feat/premium-food-ui
npm install
npx expo install --fix
npx expo start -c
```

Use o Expo Go compatível com SDK 58. Confira as dependências com `npx expo-doctor`.

## Implementado

- Home redesenhada e responsiva (banner, busca, categorias, produtos, promoção, menu inferior)
- Splash animado com xícara, vapor, identidade CIDOCA e barra de progresso visual
- Listagem de produtos filtrável, busca, detalhes de itens, quantidade e carrinho demonstrativo
- Textos em português do Brasil e formatação monetária BRL

## Limitações atuais

- Fotos temporárias remotas da Unsplash, não são fotos reais dos produtos CIDOCA
- Carrinho apenas no estado local, sem backend, checkout, pagamentos ou pedidos reais
- Navegação de demonstração; partes do aplicativo ainda são placeholders
- Necessita teste em dispositivos Android/iOS, inclusive tamanhos de tela diferentes, para validação da fidelidade ao print

Não faça merge até validar visualmente e corrigir quaisquer problemas no Expo Go.
