# AquaGraph — protótipo operacional navegável

## Objetivo
Construir uma demonstração desktop-first de alta fidelidade para um centro de operações hídricas, seguindo os mockups anexados: interface navy densa, cyan técnico, mapas GIS dominantes, gráficos operacionais e linguagem de decisão baseada em confiança e probabilidade.

## Entrega
- App shell persistente com sidebar recolhível, cabeçalho operacional, status, cidade, data/hora, notificações e perfil.
- Sete páginas navegáveis: Centro Operacional, Perdas e Vazamentos, Seca e Resiliência, Enchentes e Resposta, Active Sensing, Centro de Decisões e Configurações.
- Mapas SVG detalhados e reutilizáveis, com vias, rio, setores, redes, sensores, infraestrutura, camadas, busca e controles.
- KPIs compactos com sparklines, painéis laterais, badges consistentes, tabela operacional e gráficos Recharts com tooltips.
- Interações demonstráveis: drawer do setor 14-B, geração de ordem de serviço, simulação progressiva de vazamento, simulador de seca, tempestade extrema e instalação do sensor S-27.
- Modo Pitch em cinco etapas com navegação automática entre módulos, disparo dos cenários e encerramento com a mensagem final da marca.
- Dados mockados realistas separados por domínio para futura troca por APIs.

## Direção visual
- Reproduzir a hierarquia e densidade dos mockups, sem landing page, hero, visual branco, cards gigantes ou estética genérica.
- Fundo navy em camadas, superfícies discretas, bordas cyan muito sutis, tipografia Inter, raios de 10–12px e sombras mínimas.
- Mapas ocupam a maior área útil; painéis são compactos e conectados ao contexto operacional.
- Animações discretas, estados selecionados claros e cores semânticas estáveis: verde normal, amarelo atenção, laranja alto e vermelho crítico.

## Estrutura técnica
- TanStack Start/React/TypeScript e Tailwind v4 já existentes no projeto.
- Recharts para tendências; Lucide para iconografia; animações CSS/React discretas equivalentes ao comportamento solicitado.
- Rotas reais para cada módulo, com metadados próprios.
- Componentes compartilhados para shell, KPIs, mapas, badges, painéis, modais, toasts e modo pitch.
- Sem backend: estado local e dados mockados desde a primeira renderização.

## Validação
- Conferir navegação e simulações no navegador.
- Revisar 1440×900 e uma largura menor com sidebar recolhível.
- Verificar ausência de sobreposições, mapas legíveis, tooltips, modais, drawer, toast e fluxo completo do Modo Pitch.
