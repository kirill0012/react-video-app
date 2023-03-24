import { useAuth } from '@/hooks/useAuth'
import { Grid, Typography } from '@mui/material'
import jsHttpCookie from 'cookie'
import axios from 'axios'

import ConceptRequest, { ConceptFormData } from '@/components/ConceptRequest'
import MyProject from '@/components/MyProject'
import endpoints from '@/constants/endpoints'
import { useState } from 'react'
import { ConceptIdea, ConceptsAPI } from '@/services/concepts'
import ConceptIdeaComponent from '@/components/ConceptIdea'

type Props = {
  profile: {
    project: {
      title: string
      avatar: string | null
    } | null
    limits: {
      concept: number
    }
  }
}

type ConceptIdeaState = {
  request: ConceptFormData
  idea: ConceptIdea
} | null

function Home(props: Props) {
  const [conceptIdea, setConceptIdea] = useState<ConceptIdeaState>(null)
  const auth = useAuth()

  const { profile } = props
  const conceptDisabled = profile.limits.concept == 0 || !!conceptIdea

  if (!auth.user || !profile.project) {
    return null
  }

  const onGenerateConcept = async (data: ConceptFormData) => {
    await ConceptsAPI.generateIdea()
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
  const onConceptIdeaConfirm = async (idea: ConceptIdea) => {
    //submit
    await ConceptsAPI.generateConcept(idea)
      .then((response) => {
        console.log(response)
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

  return (
    <Grid container spacing={2} sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}>
      <Grid item xs sx={{ pr: '30px' }}>
        <MyProject project={profile.project} />
        {conceptIdea && (
          <ConceptIdeaComponent
            idea={conceptIdea.idea}
            onConfirm={onConceptIdeaConfirm}
            onRegenerate={onConceptIdeaRegenerate}
          />
        )}
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
      </Grid>
      <Grid item sx={{ width: '406px', pl: '0px !important' }}>
        <ConceptRequest disabled={conceptDisabled} onGenerate={onGenerateConcept} />
      </Grid>
    </Grid>
  )
}

export async function getServerSideProps(context: any) {
  // const preload = []
  // Promise.all(preload)

  console.log(context.req?.headers?.cookie)

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

        return {
          props: {
            profile: profile,
          },
        }
      } catch (error) {
        console.log(error)
        // invalid token
      }
    }
  }

  return {
    props: { profile: null }, // will be passed to the page component as props
  }
}

export default Home
