/// <reference types="jest" />
import { createProjectRecord, uploadAttachments } from '@sde/web/grist/grist'
import { createReadStream } from 'node:fs'
import { resolve } from 'node:path'
import FormData from 'form-data'
import Joi from 'joi'

const publicDirFile = (path: string) => resolve(__dirname, '../../public', path)

describe.skip('Grist', () => {
  it('Uploads attachements', async () => {
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

  it('Create project records', async () => {
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
})
