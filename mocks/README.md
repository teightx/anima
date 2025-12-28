# Mock Data

Este diretorio contem dados mock para desenvolvimento do MVP.

## Estrutura

Os dados mock estao em `/server/mocks/`:

- `dataset.ts` - Dataset principal com todos os dados
- `helpers.ts` - Funcoes auxiliares para acessar e filtrar dados
- `index.ts` - Export central

## Conteudo do Dataset

| Entidade     | Quantidade | Descricao                                  |
| ------------ | ---------- | ------------------------------------------ |
| user         | 1          | Usuario demo                               |
| baseline     | 1          | Avaliacao inicial completa                 |
| checkins     | 26         | 30 dias com 4 lacunas (dias 8, 15, 22, 23) |
| journals     | 4          | Entradas de diario esparsos                |
| readings     | 12         | Leituras/insights gerados                  |
| references   | 10         | Fontes de referencia (estudos)             |
| protocols    | 3          | Protocolos disponiveis                     |
| protocolRuns | 1          | Execucao de protocolo (concluida)          |
| therapy      | -          | Estado desativado por padrao               |

## Padroes de Dados

O dataset simula 30 dias com padroes realistas:

1. **Semana 1-2 (dias 0-13)**: Periodo estavel
   - Humor: 7-8
   - Energia: 6-7
   - Sono: 7-7.5 horas

2. **Semana 3 (dias 14-20)**: Periodo de instabilidade
   - Humor: 4-6
   - Energia: 4-5
   - Sono: 5-6 horas
   - Mais sintomas reportados

3. **Semana 4 (dias 21-29)**: Recuperacao gradual
   - Melhora progressiva
   - Retorno a padroes estaveis

4. **Lacunas**: Dias 8, 15, 22, 23 sem registro
   - Lacunas isoladas (8, 15)
   - Lacunas consecutivas (22-23)

## Uso

```typescript
import { dataset, getLastNDays, getDatasetStats } from '@/server/mocks';

// Acessar dados diretamente
const allCheckins = dataset.checkins;
const readings = dataset.readings;

// Usar helpers
const lastWeek = getLastNDays(dataset.checkins, 7);
const stats = getDatasetStats();
```

## Helpers Disponiveis

### Check-ins

- `getLastNDays(checkins, n)` - Ultimos N dias
- `getCheckinByDate(date)` - Check-in por data
- `getCheckinsByRange(start, end)` - Check-ins em intervalo
- `getCheckinsByWeek(weekIndex)` - Check-ins por semana
- `calculateAverageMood(checkins)` - Media de humor
- `calculateAverageEnergy(checkins)` - Media de energia
- `calculateAverageSleep(checkins)` - Media de sono
- `getGapDates()` - Datas com lacunas

### Readings

- `getReadingsByRange(start, end)` - Leituras por periodo
- `getReadingsByCategory(category)` - Leituras por categoria
- `getUnreadReadings()` - Leituras nao lidas
- `getReadingById(id)` - Leitura por ID
- `getReferencesForReading(reading)` - Referencias relacionadas

### Protocols

- `getActiveProtocolRuns()` - Execucoes ativas
- `getProtocolById(id)` - Protocolo por ID
- `calculateProtocolProgress(runId)` - Progresso percentual

### References

- `getReferenceById(id)` - Referencia por ID
- `getReferencesByTopic(topic)` - Referencias por topico

### Stats

- `getDatasetStats()` - Estatisticas gerais

## Categorias de Leituras

- `sleep_correlation` - Regularidade e qualidade de sono
- `mood_pattern` - Padroes e variabilidade de humor
- `symptom_trend` - Tendencias de sintomas
- `medication_effect` - Aderencia a medicacao
- `activity_impact` - Impacto de atividade fisica
- `general_insight` - Insights gerais e consistencia de registros

## Referencias

Cada referencia inclui:

- Titulo e autores
- Tipo (meta_analysis, peer_reviewed, guideline, etc.)
- Ano e DOI/URL
- Resumo e achados principais
- Nivel de evidencia (low/medium/high)
- Topicos relacionados
