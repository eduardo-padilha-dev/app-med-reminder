# MedReminder

## Sobre o app

O **MedReminder** é um aplicativo móvel para controle de medicamentos pessoais.
Seu objetivo é ajudar o usuário a cadastrar seus medicamentos, registrar 
os horários em que deve tomá-los e confirmar as doses ao longo do dia,
mantendo um histórico de adesão ao tratamento.

### Funcionalidades básicas (prioritárias)

- [ ] Cadastrar medicamento (nome, dose, frequência e horários)
- [ ] Listar medicamentos ativos
- [ ] Confirmar que tomou o medicamento no dia
- [ ] Visualizar histórico de confirmações
- [ ] Editar medicamento cadastrado
- [ ] Excluir medicamento

### Funcionalidades adicionais (trabalhos futuros)

- [ ] Notificações de lembrete no horário configurado
- [ ] Foto do medicamento
- [ ] Exportar relatório para levar ao médico
- [ ] Suporte a múltiplos perfis (ex: cuidador)

---

## Protótipos de tela

🔗 [Visualizar protótipos no Figma](https://www.figma.com/design/C8jJEKpQE7hetdE63mw817/med-reminder?node-id=0-1&t=AHWYWfAdYAY9e459-1)

> Protótipos desenvolvidos no Figma contemplando as principais telas do app:
> Home, Cadastro, Edição, Detalhes, Histórico, Configurações e Empty State.
> Disponível em versão Light e Dark Mode.

---

## Modelagem do banco

O banco de dados será implementado **localmente** utilizando
o [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/),
solução nativa do Expo para SQLite em dispositivos móveis.

### Diagrama:

🔗 [Visualizar diagrama ER](https://drive.google.com/file/d/1bn2hE3GWZJ_j_O1znC4aWqVgUtHtCEaF/view?usp=drive_link)

### Tabelas

**medications**
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `name` TEXT NOT NULL
- `dose` TEXT NOT NULL
- `frequency` TEXT NOT NULL (ex: "diário", "8h")
- `times` TEXT NOT NULL (horários em JSON, ex: ["08:00","20:00"])
- `notes` TEXT
- `active` INTEGER DEFAULT 1
- `created_at` TEXT NOT NULL

**medication_logs**
- `id` INTEGER PRIMARY KEY AUTOINCREMENT
- `medication_id` INTEGER NOT NULL (FK → medications.id)
- `scheduled_time` TEXT NOT NULL
- `taken_at` TEXT
- `status` TEXT NOT NULL (ex: "tomado", "pulado", "pendente")

---

## Planejamento de sprints

| Sprint | Período      | Tarefas                                                                                          | Status |
|--------|--------------|--------------------------------------------------------------------------------------------------|--------|
| 1      | Semana 1-2   | Configurar projeto Expo (#5), instalar ooglon-ui (#6), NativeWind (#7), Zustand (#8), RHF+Zod (#9), date-fns (#10) | ✅     |
| 2      | Semana 3-4   | Configurar estrutura de pastas (#11), criar tela Home (#12), criar tela Cadastro (#13), criar tela Histórico (#14) | ⬜     |
| 3      | Semana 5-6   | Criar componente MedicationCard (#15), criar componente StatusBadge (#16), popular telas com dados fake (#17) | ✅     |
| 4      | Semana 7-8   | Configurar SQLite (#20), criar migrations (#21), implementar store Zustand (#22), CRUD completo (#23, #24, #25, #26) | ⬜     |
| 5      | Semana 9-10  | Tela Detalhes (#27), tela Edição (#28), confirmar dose (#29), Histórico com dados reais (#30), Empty State (#31) | ⬜     |
| 6      | Semana 11-12 | Configurações (#32), Dark Mode (#33), validações Zod (#34), testes e bugs (#35), build APK (#36), Release (#37), vídeo (#39) | ⬜     |
