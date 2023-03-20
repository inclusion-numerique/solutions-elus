import {
  drupalProjectArrayDumb,
  drupalProjectDumb,
  drupalProjectsJson,
  gristProjectArrayDumb,
  gristProjectDumb,
} from '@sde/cli/drupal/convertDrupalProjectsToGristProject.dumb'
import { GristProjectFields } from '@sde/cli/grist/grist.type'
import { DrupalProjectType } from './Types'
import {
  convertDrupalProjectsToGristProjects,
  convertJSONToDrupalProjects,
  convertToGristProject,
} from './convertDrupalProjectsToGristProjects'

describe('convertDrupalProjectsToGristProjects', () => {
  it('should parse a json of drupal project and extract an array of drupal projects', () => {
    const drupalProjects: DrupalProjectType[] =
      convertJSONToDrupalProjects(drupalProjectsJson)
    expect(drupalProjects.length).toBe(3)
  })

  it('should convert a project from drupal to a grist project', () => {
    const gristProject: GristProjectFields =
      convertToGristProject(drupalProjectDumb)
    expect(gristProject).toStrictEqual(gristProjectDumb)
  })
})

it('should convert an array of drupal projects to an array of grist projects', () => {
  expect(
    convertDrupalProjectsToGristProjects(drupalProjectArrayDumb),
  ).toStrictEqual(gristProjectArrayDumb)
})
