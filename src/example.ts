import { createTokenAuth } from '@octokit/auth-token'
import { graphql, GraphQlQueryResponseData } from '@octokit/graphql'
import { Octokit } from '@octokit/rest'

const authentication = createTokenAuth(process.env.GH_AUTH as string)
  // graph..
  ; (async () => {
    var query = `
      query {
        user(login: "HallexCosta") {
          projectsV2(first: 4) {
            nodes {
              id,
              title
            }
          }
        }
      }
    `

    const graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: `bearer ${(await authentication()).token}`
      }
    })

    const response = (await graphqlWithAuth(query)) as GraphQlQueryResponseData
    console.log(response.user.projectsV2.nodes)
  })()

  // rest...
  ; () => {
    authentication().then((auth) => {
      console.log(auth)
      const octokit = new Octokit({
        auth: `bearer ${auth.token}`
      })

      octokit.rest.projects
        .listForUser({
          username: 'HallexCosta'
        })
        .then((response) => console.log(response))
        .catch(console.log)
    })
  }
