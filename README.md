# Cafeteria CIDOCA ☕

Aplicativo demonstrativo em **React Native + Expo + TypeScript**, com interface brasileira inspirada na referência visual enviada.

## Executar no VS Code

```powershell
git switch feat/premium-food-ui
git pull origin feat/premium-food-ui
npm install
npx expo install --fix
npx expo start -c
```

## Refatoração atual

- Áreas seguras superiores e inferiores com `react-native-safe-area-context`, considerando câmera/notch e navegação do sistema
- Navegação inferior redesenhada e mais compacta
- Tipografia Playfair Display para a marca e títulos; DM Sans para interface
- Banner da Home troca automaticamente a cada cinco segundos e aceita seleção pelos indicadores
- Carrinho demonstrativo com produtos, botões +/−, subtotal e resumo
- Central de notificações com itens e leitura individual/global (dados simulados)
- Nova animação de abertura com vapor, xícara, marca e carregamento progressivo
- Conteúdo em português brasileiro e preços em reais

## Importante

A UI foi alterada no repositório, mas **não foi validada em aparelhos reais**. Faça teste de notch, barra inferior Android, fontes, rolagem e cards em diferentes dimensões. A animação é uma tela introdutória no React Native e não substitui o splash nativo do sistema.

Fotografias são temporárias, obtidas por URLs externas. Carrinho, notificações e catálogo estão em memória; não há banco, checkout nem pedidos reais.
