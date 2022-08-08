import { graphql } from '@octokit/graphql'

declare type UserProjectItemNode = {
  id: string
  type: string
  content: {
    id: string
    number: number
    title: string
    closed: boolean
    projectCards: {
      nodes: {
        column: {
          id: string
          name: string
        }
      }[]
    }
  }
}
export declare type UserProjectItemsProps = {
  user: {
    projectV2: {
      id: string
      title: string
      url: string
      items: {
        totalCount: number
        nodes: UserProjectItemNode[]
      }
    }
  }
}
export declare type ProjectAddItemResponse = {
  addProjectV2ItemById: {
    item: {
      id: string
      type: string
      content: {
        id: string
        number: number
        title: string
        closed: boolean
        projectCards: {
          nodes: {
            column: {
              id: string
              name: string
            }
          }[]
        }
      }
    }
  }
}
export default class {
  private options: {
    headers: {
      authorization: string
    }
  }
  public constructor(
    private readonly username: string,
    private readonly token: string
  ) {
    this.options = {
      headers: {
        authorization: `bearer ${this.token}`
      }
    }
  }

  private async graphqlWithAuth(query: string) {
    return graphql.defaults(this.options).call(null, query)
  }

  public async *addItemsInProject(
    toProjectId: string,
    itemsContent: UserProjectItemNode[]
  ) {
    for (const item of itemsContent) {
      const isDraftIssue = item.type.includes('DRAFT')
      if (!isDraftIssue)
        yield await this.addItemInProject(toProjectId, item.content.id)
    }
  }

  public async addItemInProject(
    projectId: string,
    contentId: string
  ): Promise<ProjectAddItemResponse> {
    const query = `
     mutation {
      addProjectV2ItemById(input: {
        projectId: "${projectId}",
        contentId: "${contentId}"
      }) {
        item {
          id,
          type,
          content {
            ... on PullRequest {
              id,
              number,
              title,
              closed,
              projectCards {
                nodes {
                  column {
                    id,
                    name
                  }
                }
              }
            },            
            ... on Issue {
              id
              number,
              title,
              closed,
              projectCards {
                nodes {
                  column {
                    id,
                    name
                  }
                }
              }
            },           
            ... on DraftIssue {
              id,
              title
            }
          }
        }
      }
    }`
    return (await this.graphqlWithAuth(query)) as any
  }
  public async listProjectItems(
    number: number
  ): Promise<UserProjectItemsProps> {
    const query = `
      query {
        user(login: "${this.username}") {
          projectV2(number: ${number}) {
            id,
            title,
            url,
            items(first: 100) {
              totalCount,
              nodes {
                id,
                type,
                content {
                  ... on PullRequest {
                    id,
                    number,
                    title,
                    closed,
                    projectCards {
                      nodes {
                        column {
                          id,
                          name
                        }
                      }
                    }
                  },            
                  ... on Issue {
                    id
                    number,
                    title,
                    closed,
                    projectCards {
                      nodes {
                        column {
                          id,
                          name
                        }
                      }
                    }
                  },           
                  ... on DraftIssue {
                    id,
                    title
                  }
                }
              }
            }
          }
        }
      }
    `
    return (await this.graphqlWithAuth(query)) as any
  }
}
