# React video app

### Project directory layout

    .
    ├── public                  # Folder for any public static files
    ├── src                     # App source files
    │   ├── components          
    │   │   ├── Concept/*       # Components related to Concepts representation, Generations, Idea
    │   │   ├── Dialogs/*       # Modal dialogs: Iterate, Rate, Video display

    │   ├── constants           
    │   │   ├── endpoints.ts    # List of the API endpoints urls
    │   │   ├── iteration.ts    # List of the Iteration actions

    │   ├── layouts           
    │   │   ├── BlankLayout.tsx # Page layout for guest full-page forms (Login, Forgot password, etc)
    │   │   ├── UserLayout.tsx  # Page layout for logged in users with top bar

    │   ├── pages           
    │   │   ├── api/*           # Folder contains mock API
    │   │   ├── login/index.ts  # Login page
    │   │   ├── index.ts        # Main page of the app

    │   ├── services            # Service layer for API calls
    │   │   ├── auth.ts         # Auth (login/logout)
    │   │   ├── concepts.ts     # Concepts (generate, cancel, list, iterate)
    │   │   ├── ideas.ts        # Ideas generation
    │   │   ├── videos.ts       # Videos rate


### Components hierarchy
    ├── index.tsx                  
    │   ├── MyProject                        # Project header
    │   ├── ConceptIdeaComponent             # Idea generation
    |   ├── ConceptsList                     # General component for concepts
    |   |   ├── ConceptItemComponent         # Representation of Concept item
    |   |   |   ├── ConceptGenerationComponent
    |   |   |   ├── VideoViewComponent
    |   |   |   ├── RateQualityComponent
    |   |   |   ├── IterateConceptComponent
    |   ├── ConceptRequest                   # Form for concept request


## Datatypes

> All service files contains TypeScript typings for expected API responses

### User info
```
export type UserDataType = {
  id: number
  name: string
  avatar?: string | null
}

export type Profile = {
  project: {
    title: string
    avatar: string | null
  } | null
  limits: {
    concept: number
    iterations: number
  }
}
```

### Concepts items
```
export type ConceptItem = {
  id: number
  generations: Array<Generation>
}

export type Generation = {
  id: number
  ref: string
  brief: string
  inProgress: boolean
  created: Date | string
  eta?: Date | string
  videos: Array<VideoItem>
}

export type VideoItem = {
  id: number
  src: string
  image: string
  name: string
}
```

### Idea item
```
export type IdeaItem = {
  id: number
  title: string
  description: string
} | null
```
