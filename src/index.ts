import OctoController from './controllers/octoController'

const GH_AUTH = process.env.GH_AUTH as string
const GH_LOGIN = process.env.GH_LOGIN as string

console.log('GH_AUTH', GH_AUTH)

  ; (async () => {
    const octoController = new OctoController(GH_LOGIN, GH_AUTH)
    const FROM_PROJECTS = [4, 5]
    const TO_PROJECT = 3

    const newProject = await octoController.listProjectItems(TO_PROJECT)
    const toProjectId = newProject.user.projectV2.id

    console.log('TO_PROJECT_ID', toProjectId)
    for (const FROM_PROJECT of FROM_PROJECTS) {
      const oldProject = await octoController.listProjectItems(FROM_PROJECT)
      const fromProjectId = oldProject.user.projectV2.id
      console.log('FROM_PROJECT_ID', fromProjectId)

      const items = oldProject.user.projectV2.items.nodes

      for await (const item of octoController.addItemsInProject(
        toProjectId,
        items
      )) {
        const title = item.addProjectV2ItemById.item.content.title
        const number = item.addProjectV2ItemById.item.content.number
        console.log(`#${number} - ${title}`)
      }
    }
  })()