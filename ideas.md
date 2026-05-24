# Brainstorming de Design — Mobra Plataforma

## Contexto
Plataforma de logística/frete com duas novas seções:
1. Área de Conta Parceiro — criação/gerenciamento com benefícios destacados
2. Painel de Ofertas Ativas — listagem de freteiros com estrelas e valor

---

<response>
<probability>0.07</probability>
<idea>
**Design Movement:** Industrial Logistics Brutalism — Funcional, direto, sem ornamentos desnecessários.

**Core Principles:**
- Hierarquia tipográfica agressiva com pesos extremos (Black vs Regular)
- Cores de alto contraste: laranja construção + preto profundo + branco
- Grid assimétrico com blocos de conteúdo deslocados
- Badges e tags com bordas nítidas sem radius

**Color Philosophy:** Laranja (#F97316) como cor de ação e urgência — evoca caminhões, canteiros, movimento. Preto (#111) como base de autoridade. Branco puro para respiração.

**Layout Paradigm:** Blocos empilhados com offset horizontal. Seções que "cortam" umas às outras com clip-path diagonal. Nenhum card com sombra suave — apenas bordas definidas.

**Signature Elements:**
- Números grandes em background (opacidade 5%) como textura decorativa
- Linhas diagonais separando seções
- Tags/badges com fundo sólido e sem radius

**Interaction Philosophy:** Sem animações desnecessárias. Hover muda cor de fundo instantaneamente. Foco em velocidade de leitura.

**Animation:** Apenas fade-in de 150ms em cards ao entrar na viewport. Botões com scale(0.97) no active.

**Typography System:** Fonte display: Space Grotesk 800 para títulos. Corpo: DM Sans 400/500. Hierarquia: 56px / 32px / 20px / 14px.
</idea>
</response>

<response>
<probability>0.08</probability>
<idea>
**Design Movement:** Clean Tech Logistics — Minimalismo técnico com toques de azul profissional.

**Core Principles:**
- Espaçamento generoso e respiração visual
- Azul marinho (#1E3A5F) como âncora, com azul elétrico (#2563EB) para ações
- Cards com sombra sutil e radius médio
- Tipografia clara e legível em todas as densidades de informação

**Color Philosophy:** Azul transmite confiança, profissionalismo e tecnologia — ideal para plataforma B2B de logística. Amarelo âmbar (#F59E0B) como acento para badges de destaque (parceiro premium, oferta especial).

**Layout Paradigm:** Navbar fixa com logo à esquerda. Hero assimétrico com texto à esquerda e visual à direita. Seções alternando fundo branco e azul muito claro (#F0F4FF). Cards em grid 3 colunas no desktop, 1 no mobile.

**Signature Elements:**
- Ícones de caminhão/rota como ilustrações minimalistas
- Barra de progresso animada mostrando "credibilidade do parceiro"
- Cards de freteiro com avatar circular, estrelas douradas e badge de verificado

**Interaction Philosophy:** Hover com elevação de sombra suave. Transições de 200ms. Feedback visual imediato em formulários.

**Animation:** Cards de oferta entram com stagger de 60ms da esquerda. Modal de parceiro com slide-up de 300ms.

**Typography System:** Fonte: Sora 700 para títulos, Inter 400/500 para corpo. Títulos: 48px hero, 32px seção, 20px card.
</idea>
</response>

<response>
<probability>0.06</probability>
<idea>
**Design Movement:** Warm Logistics — Humanizado, acolhedor, com personalidade de startup brasileira.

**Core Principles:**
- Paleta quente: azul petróleo (#0F4C75) + laranja suave (#FF6B35) + creme (#FFF8F0)
- Formas orgânicas com radius generoso (16-24px)
- Ilustrações flat com personagens representando parceiros e freteiros
- Linguagem visual que transmite comunidade e confiança

**Color Philosophy:** Creme como fundo principal evoca calor e acolhimento. Azul petróleo para seriedade. Laranja para energia e chamadas de ação. Combinação incomum no setor de logística — diferenciador visual.

**Layout Paradigm:** Hero com fundo creme e ilustração à direita. Seção de parceiro com fundo azul petróleo e texto branco. Ofertas em layout de feed vertical com cards largos.

**Signature Elements:**
- Avatares de freteiros com bordas coloridas indicando status
- Selo "Parceiro Verificado" com ícone de escudo
- Seção de benefícios com ícones grandes e texto curto

**Interaction Philosophy:** Animações suaves e orgânicas. Hover com leve rotação de ícone. Formulários com feedback positivo (checkmark animado).

**Animation:** Hero com fade-in sequencial de elementos (150ms stagger). Cards de oferta com slide-up de 250ms.

**Typography System:** Fonte: Plus Jakarta Sans 800 para títulos, 400 para corpo. Títulos em azul petróleo, subtítulos em laranja.
</idea>
</response>

---

## Escolha: Clean Tech Logistics (Abordagem 2)

Azul profissional com acento âmbar, tipografia Sora + Inter, cards com sombra sutil, layout assimétrico no hero e seções bem definidas. Ideal para transmitir confiança e profissionalismo na plataforma de logística.
