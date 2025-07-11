// Exemplos de uso dos backgrounds de construção civil
// Para usar, importe e adicione no seu page.tsx

import BrickPattern from "@/components/magicui/brick-pattern";
import ConstructionBackground from "@/components/magicui/construction-background";

// Opções de background:

// 1. Padrão de Tijolos (Recomendado - mais sutil e profissional)
<BrickPattern opacity={2.515} animate={true} />

// 2. Blueprint/Ferramentas de Construção (mais detalhado)
<ConstructionBackground opacity={0.03} />

// 3. Padrão de Tijolos mais visível
<BrickPattern opacity={0.03} animate={true} />

// 4. Sem animação (melhor performance)
<BrickPattern opacity={0.02} animate={false} />

// 5. Combinação dos dois (mais rico visualmente)
<>
  <ConstructionBackground opacity={0.02} />
  <BrickPattern opacity={0.01} animate={true} />
</>

/* 
DICAS DE USO:

- opacity: 0.01-0.03 (valores muito baixos para não interferir no conteúdo)
- animate: true/false (partículas animadas de poeira de construção)
- São backgrounds fixos que cobrem toda a tela
- Respondem ao tema da cor primária do site
- Posicionados com z-index negativo para ficarem atrás do conteúdo

TEMAS RELACIONADOS À CONSTRUÇÃO:
✅ Padrão de tijolos
✅ Linhas de blueprint/projeto
✅ Ferramentas de construção (martelo, chave inglesa, chave de fenda)
✅ Partículas de poeira animadas
✅ Grid técnico/arquitetural
*/
