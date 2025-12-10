# ComicFlow 🎨

**Narrative Comic Creation Studio** — AI-powered comic panel generation for storytellers, illustrators, and parents creating magical stories for children.

![ComicFlow](https://avatars.githubusercontent.com/u/160292135?v=4)

## 🌟 Overview

ComicFlow is a professional comic panel generation tool that maintains visual consistency across narrative sequences. Users define a character once, then generate multiple comic panels showing that character in different scenarios while preserving their visual identity throughout the story.

## ✨ Features

- **Character Consistency** — Define your character's visual DNA once and maintain it across all panels
- **Scene Director** — Describe actions and scenarios for each panel
- **Orientation Control** — Switch between landscape and portrait formats
- **Story Board Grid** — View and manage your last 4 generated panels
- **Real-time Generation Status** — Animated feedback during AI processing

## 🎯 Design Philosophy

**Modern Editorial meets Neo-Brutalism** — A dark, studio-grade interface that balances professional sophistication with bold, graphic clarity. Think Figma's precision meets comic book energy.

### Color System
- **Background**: Deep charcoal `#0F0F12`
- **Primary Accent**: Sharp cyan `#00E5FF`
- **Warning/Progress**: Warm amber `#FFB020`
- **Cards**: Blue-gray tint `#1A1B23`
- **Inputs**: Elevated surface `#252630`

### Typography
- **Display**: `Syne` at 800 weight — geometric brutalism
- **Interface**: `Space Grotesk` at 500/600 — technical yet friendly
- **Body**: `IBM Plex Mono` at 400 — studio/technical vibe

## 🔄 Application Flow

```mermaid
graph TD
    Start([User Opens ComicFlow]) --> DefineChar[Enter Character Name & Visual Description]
    DefineChar --> CharPersist[Character Data Persists in State]
    CharPersist --> SceneInput[Enter Scene Action in Scene Director Panel]
    
    SceneInput --> OrientChoice{Select Panel Orientation}
    OrientChoice -->|Landscape| SetLandscape[Set Landscape Format]
    OrientChoice -->|Portrait| SetPortrait[Set Portrait Format]
    
    SetLandscape --> ReadyGen[Ready to Generate]
    SetPortrait --> ReadyGen
    
    ReadyGen --> ClickGen[Click Generate Panel Button]
    ClickGen --> BtnLoading[Button Enters Loading State]
    BtnLoading --> ShowProgress[Display Animated Progress Indicator]
    ShowProgress --> TriggerAPI[Trigger API Call with Character + Scene Data]
    
    TriggerAPI --> APIProcess{API Processing}
    APIProcess -->|Success| ReceivePanel[Receive Generated Panel]
    APIProcess -->|Error| ShowError[Display Error State]
    
    ShowError --> RetryChoice{User Action}
    RetryChoice -->|Retry| ClickGen
    RetryChoice -->|Modify Scene| SceneInput
    
    ReceivePanel --> FadeIn[Panel Fades In with Scale Animation]
    FadeIn --> DisplayCanvas[Display Panel in Main Canvas]
    DisplayCanvas --> UpdateBoard[Prepend Panel to Story Board Grid]
    
    UpdateBoard --> CheckLimit{Story Board Count > 4?}
    CheckLimit -->|Yes| RemoveOldest[Remove Oldest Panel]
    CheckLimit -->|No| MaintainGrid[Maintain Current Grid]
    
    RemoveOldest --> StaggerAnim[Stagger Thumbnail Entrance Animations]
    MaintainGrid --> StaggerAnim
    
    StaggerAnim --> UserChoice{User Next Action}
    
    UserChoice -->|Generate New Panel| ModifyScene[Modify Scene Action Only]
    UserChoice -->|View Previous Panel| ClickThumb[Click Thumbnail in Story Board]
    UserChoice -->|Change Character| UpdateChar[Update Character Description]
    
    ModifyScene --> SceneInput
    
    ClickThumb --> SwapCanvas[Swap Thumbnail into Main Canvas]
    SwapCanvas --> FadeTransition[Fade Transition Animation]
    FadeTransition --> UserChoice
    
    UpdateChar --> DefineChar

    style Start fill:#00E5FF,stroke:#00E5FF,color:#0F0F12
    style CharPersist fill:#1A1B23,stroke:#00E5FF,color:#FFFFFF
    style APIProcess fill:#252630,stroke:#00E5FF,color:#FFFFFF
    style ShowError fill:#FFB020,stroke:#FFB020,color:#0F0F12
    style DisplayCanvas fill:#1A1B23,stroke:#00E5FF,color:#FFFFFF
```

## 🏗️ Component Architecture

```mermaid
graph TB
    subgraph Pages
        Landing[Landing Page<br/>/]
        Studio[Studio Page<br/>/studio]
    end
    
    subgraph ComicFlow Components
        CPC[CharacterProfileCard]
        SDP[SceneDirectorPanel]
        MC[MainCanvas]
        SBG[StoryBoardGrid]
        GS[GenerationStatus]
    end
    
    subgraph State Management
        CharState[Character State<br/>name, description]
        SceneState[Scene State<br/>action, orientation]
        GenState[Generation State<br/>isGenerating, status]
        PanelState[Panels State<br/>panels array, currentPanel]
    end
    
    Landing -->|Navigate| Studio
    Studio --> CPC
    Studio --> SDP
    Studio --> MC
    Studio --> SBG
    Studio --> GS
    
    CPC --> CharState
    SDP --> SceneState
    SDP --> GenState
    MC --> PanelState
    SBG --> PanelState
    GS --> GenState

    style Landing fill:#00E5FF,stroke:#00E5FF,color:#0F0F12
    style Studio fill:#00E5FF,stroke:#00E5FF,color:#0F0F12
    style CPC fill:#1A1B23,stroke:#00E5FF,color:#FFFFFF
    style SDP fill:#1A1B23,stroke:#00E5FF,color:#FFFFFF
    style MC fill:#1A1B23,stroke:#00E5FF,color:#FFFFFF
    style SBG fill:#1A1B23,stroke:#00E5FF,color:#FFFFFF
    style GS fill:#1A1B23,stroke:#00E5FF,color:#FFFFFF
```

## 🎬 User Journey

```mermaid
journey
    title ComicFlow User Journey
    section Discovery
      Visit Landing Page: 5: User
      Learn about features: 4: User
      Click Start Creating: 5: User
    section Character Setup
      Enter character name: 4: User
      Describe character visually: 4: User
    section Panel Creation
      Write scene action: 5: User
      Select orientation: 3: User
      Click Generate: 5: User
      Wait for AI: 3: User
      View generated panel: 5: User
    section Story Building
      Generate more panels: 5: User
      Review story board: 4: User
      Click thumbnails to preview: 4: User
```

## 🔧 State Flow

```mermaid
stateDiagram-v2
    [*] --> Idle
    
    Idle --> CharacterDefined: Enter character details
    CharacterDefined --> SceneReady: Enter scene action
    SceneReady --> Generating: Click Generate
    
    Generating --> Success: API returns panel
    Generating --> Error: API fails
    
    Success --> SceneReady: Ready for next panel
    Error --> SceneReady: User retries/modifies
    
    SceneReady --> CharacterDefined: Update character
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Landing page
│   ├── studio/
│   │   └── page.tsx      # Comic creation studio
│   └── globals.css       # Global styles & animations
├── components/
│   ├── comicflow/
│   │   ├── CharacterProfileCard.tsx
│   │   ├── SceneDirectorPanel.tsx
│   │   ├── MainCanvas.tsx
│   │   ├── StoryBoardGrid.tsx
│   │   └── GenerationStatus.tsx
│   └── ui/               # ShadCN components
└── lib/
    └── utils.ts
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🎨 Key Interactions

| Interaction | Animation |
|-------------|-----------|
| Panel Generation | Radial pulse from button |
| New Panel Appears | 400ms fade-in + scale (0.95 → 1.0) |
| Thumbnail Entrance | 80ms stagger delay |
| Hover States | 200ms spring + subtle scale (1.02) |
| Canvas Active | 4px cyan border glow |

## 🖼️ Screenshots

### Landing Page
- Floating navigation header
- Hero section with animated elements
- Feature cards with hover effects
- Example gallery with zoom interactions

### Studio
- Two-column layout (40/60 split)
- Character Profile Card (left sidebar)
- Scene Director Panel with orientation toggle
- Main Canvas with active border
- Story Board Grid timeline

## 📝 License

MIT License — Built with ❤️ for storytellers everywhere.
