import { useState } from 'react'
import { Grid, Typography } from '@mui/material'
import jsHttpCookie from 'cookie'
import axios from 'axios'

import { useAuth } from '@/hooks/useAuth'
import { ConceptItem, ConceptsAPI } from '@/services/concepts'
import ConceptRequest, { ConceptFormData } from '@/components/ConceptRequest'
import MyProject from '@/components/MyProject'
import endpoints from '@/constants/endpoints'
import ConceptIdeaComponent from '@/components/ConceptIdea'
import ConceptsList from '@/components/ConceptsList'
import { GetServerSideProps } from 'next/types'
import { IdeaItem, IdeasAPI } from '@/services/ideas'
import Head from 'next/head'
import { IterateFormData } from '@/components/IterateConcept'

type Props = {
  profile: {
    project: {
      title: string
      avatar: string | null
    } | null
    limits: {
      concept: number
      iterations: number
    }
  }
  concepts: Array<ConceptItem>
}

type ConceptIdeaState = {
  request: ConceptFormData
  idea: IdeaItem
} | null

function Home(props: Props) {
  const { profile } = props

  const [concepts, setConcepts] = useState<ConceptItem[]>(props.concepts)
  const [conceptIdea, setConceptIdea] = useState<ConceptIdeaState>(null)
  const auth = useAuth()

  const conceptDisabled =
    profile.limits.concept == 0 ||
    !!conceptIdea ||
    (concepts.length > 0 && concepts[0].generations[0].inProgress)
  const iterationDisabled = profile.limits.iterations == 0

  if (!auth.user || !profile.project) {
    return null
  }

  const onGenerateConcept = async (data: ConceptFormData) => {
    await IdeasAPI.generateIdea()
      .then((idea) => {
        console.log(idea)
        setConceptIdea({
          idea,
          request: data,
        })
      })
      .catch(() => {
        setConceptIdea(null)
      })
  }
  const onConceptIdeaConfirm = async (idea: IdeaItem) => {
    //submit
    await ConceptsAPI.generateConcept(idea)
      .then((concept) => {
        setConcepts((state) => {
          return [concept, ...state]
        })
        console.log(concept)
        // push generation step
      })
      .finally(() => {
        setConceptIdea(null)
      })
  }
  const onConceptIdeaRegenerate = async () => {
    // request for another idea with conceptIdea.request data
    setConceptIdea((prevState: any) => {
      return {
        ...prevState,
        idea: { ...prevState?.idea, title: 'Another iteration of idea generation' },
      }
    })
  }
  const onCancelGeneration = async (id: number) => {
    await ConceptsAPI.cancelGeneration(id)
      .then(() => {
        return ConceptsAPI.listConcepts()
      })
      .then((concepts) => {
        setConcepts(concepts)
      })
  }
  const onIterateVideo = async (videoId: number, data: IterateFormData) => {
    await ConceptsAPI.iterateConcept(videoId, data.subject, data.transcript, data.remove)
      .then(() => {
        return ConceptsAPI.listConcepts()
      })
      .then((concepts) => {
        setConcepts(concepts)
      })
  }

  return (
    <Grid container spacing={2} sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}>
      <Head>
        <title>SettAI</title>
      </Head>
      <Grid item xs sx={{ pr: '30px', pt: '22px !important' }}>
        <MyProject project={profile.project} />
        {conceptIdea && (
          <ConceptIdeaComponent
            idea={conceptIdea.idea}
            onConfirm={onConceptIdeaConfirm}
            onRegenerate={onConceptIdeaRegenerate}
          />
        )}
        {concepts.length == 0 && (
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#81848F',
              textAlign: 'center',
            }}
          >
            You still didn’t generate any videos!
          </Typography>
        )}
        <ConceptsList
          concepts={concepts}
          onCancel={onCancelGeneration}
          onIterateVideo={onIterateVideo}
          iterationDisabled={iterationDisabled}
        />
      </Grid>
      <Grid item sx={{ width: '406px', pl: '0px !important' }}>
        <ConceptRequest disabled={conceptDisabled} onGenerate={onGenerateConcept} />
      </Grid>
    </Grid>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.req?.headers?.cookie) {
    const { token } = jsHttpCookie.parse(context.req.headers.cookie)

    if (token) {
      try {
        const profile = await axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}${endpoints.profileEndpoint}`, {
            headers: context.req.headers.cookie
              ? { cookie: context.req.headers.cookie }
              : undefined,
            withCredentials: true,
          })
          .then((response) => {
            return response.data
          })

        const concepts = await axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}${endpoints.conceptsListEndpoint}`, {
            headers: context.req.headers.cookie
              ? { cookie: context.req.headers.cookie }
              : undefined,
            withCredentials: true,
          })
          .then((response) => {
            return response.data
          })

        return {
          props: {
            profile: profile,
            concepts: concepts,
          },
        }
      } catch (error) {
        console.log(error)
        // invalid token
      }
    }
  }

  return {
    props: { profile: null, concepts: [] }, // will be passed to the page component as props
  }
}

export default Home
