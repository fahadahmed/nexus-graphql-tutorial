import { createTestContext } from './__helpers';

const ctx = createTestContext();

it('ensures that a draft can be created and published', async () => {
  // Create a new draft
  const draftResult = await ctx.client.request(`
    mutation {
      createDraft(title: "Nexus", body: "...") {
        id
        title
        body
        published
      }
    }
  `)

  // Snapshot that draft and expect `published` to be false
  expect(draftResult).toMatchInlineSnapshot(`
Object {
  "createDraft": Object {
    "body": "...",
    "id": 1,
    "published": false,
    "title": "Nexus",
  },
}
`);

  const publishResult = await ctx.client.request(`
    mutation publishDraft($draftId: Int!) {
      publish(draftId: $draftId) {
        id
        title
        body
        published
      }
    }
  `,
    { draftId: draftResult.createDraft.id }
  )
  expect(publishResult).toMatchInlineSnapshot(`
Object {
  "publish": Object {
    "body": "...",
    "id": 1,
    "published": true,
    "title": "Nexus",
  },
}
`)
})