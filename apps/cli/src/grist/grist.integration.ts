/// <reference types="jest" />
import { createReadStream } from 'node:fs'
import { resolve } from 'node:path'
import FormData from 'form-data'
import Joi from 'joi'
import { createProjectRecord, listProjectRecords, uploadAttachments } from '@sde/cli/grist/grist'

const publicDirFile = (path: string) => resolve(__dirname, '../../../web/public', path)

describe('Grist', () => {

  // ⚠️ No test grist for now, this impacts production
  it.skip('Uploads attachements', async () => {
    const formData = new FormData()
    formData.append(
      'upload',
      createReadStream(publicDirFile('images/anct.svg')),
    )

    const result = await uploadAttachments(formData)
    expect(result).toMatchSchema(
      Joi.array().length(1).items(Joi.number().integer()),
    )
  })

  // ⚠️ No test grist for now, this impacts production
  it.skip('Create project records', async () => {
    const result = await createProjectRecord({
      Test: true,
      Référence: 'TestId',
      Date: new Date().toISOString(),
      Nom: 'Jean',
      Qualité: 'Testeur',
      Email: 'hugues.maignol@beta.gouv.fr',
      Téléphone: '06 06 06 06 06',
      Domaine: 'Inclusion numérique',
      Solution: 'Formulaire projets territoires',
      Description: 'Un formulaire pour décrire son projet',
      Dates: 'Créé le 7 novembre 2022',
      Partenaires: 'ANCT, Programme inclusion numérique',
      Technique: 'Next js deployé sur Scalingo et Grist',
      'Pièces jointes': [],
    })

    expect(result).toStrictEqual({ Nom: 'Roger' })
  })

  it('Lists projects', async () => {

    const result = await listProjectRecords()

    expect(result.records).toBeArray()

    expect(result.records[0]).toBeObject()
    expect(result.records[0].id).toBeInteger()
    expect(result.records[0].fields).toBeObject()
    expect(result.records[0].fields.Titre).toBeString()
  })
})