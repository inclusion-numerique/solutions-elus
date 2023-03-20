import { GristProjectFields } from '@sde/cli/grist/grist.type'
import { DrupalProject } from './fetchDrupalProjects'

export const drupalProjectDumb: DrupalProject = {
  type: 'node--project',
  id: '66ef1294-9bcc-4ba4-9ac8-8b9a649bcf2b',
  attributes: {
    drupal_internal__nid: 40,
    drupal_internal__vid: 40,
    langcode: 'fr',
    revision_timestamp: '2020-04-28T21:34:12+00:00',
    revision_log: null,
    status: true,
    title: 'Sur les bancs de la Cité éducative de Charleville-Mézières',
    created: '2020-04-28T21:31:04+00:00',
    changed: '2022-11-18T16:16:20+00:00',
    promote: false,
    sticky: false,
    default_langcode: true,
    revision_translation_affected: true,
    metatag: null,
    path: {
      alias: '/sur-les-bancs-de-la-cite-educative-de-charleville-mezieres-40',
      pid: 248,
      langcode: 'fr',
    },
    field_agenda_txtfs: null,
    field_department_city_txtps: 'Charleville-Mézières (Ardennes)',
    field_description_txtps:
      'La Cité éducative de Charleville-Mézières : le quartier prioritaire de la Ronde-Couture\r\n7 500 habitants\r\nTaux de pauvreté : 46,9%\r\nRevenu moyen : 550 euros par habitant\r\nPart de la population sans diplôme ou inférieur au Bac : 87,5% (données Insee, 2010)\r\nUne école primaire et deux collège',
    field_display_update_date: false,
    field_funding_txtpl: null,
    field_geocoding: {
      address_name: '',
      street: '',
      zipcode: '',
      city: 'Charleville-Mézières',
      country: '',
      additional: '',
      lat: 49.768_191,
      lon: 4.720_605,
      feature:
        '{"type":"Feature","geometry":{"type":"Point","coordinates":[4.720605,49.768191]},"properties":{"label":"Charleville-Mézières","score":0.7841351948051947,"id":"08105","type":"municipality","name":"Charleville-Mézières","postcode":"08000","citycode":"08105","x":824027.66,"y":6964602.11,"population":46682,"city":"Charleville-Mézières","context":"08, Ardennes, Grand Est","importance":0.48263}}',
    },
    field_label_txt: 'Charleville-Mézières (08)',
    field_localization_txtps: 'Charleville-Mézières (08)',
    field_metatags: null,
    field_program_title_txtps: 'Programme',
    field_program_txtps: 'Cités éducatives',
    field_teaser_txtps:
      ' Découvez comment le dispositif agit sur ce territoire précurseur labellisé Cité éducative',
  },
}
export const drupalProjectArrayDumb: DrupalProject[] = [
  drupalProjectDumb,
  drupalProjectDumb,
]

export const gristProjectDumb: GristProjectFields = {
  Titre: 'Sur les bancs de la Cité éducative de Charleville-Mézières',
  Cree_le: new Date('2020-04-28T21:31:04+00:00').getTime() / 1000,
  Presentation_du_territoire:
    'La Cité éducative de Charleville-Mézières : le quartier prioritaire de la Ronde-Couture\r\n7 500 habitants\r\nTaux de pauvreté : 46,9%\r\nRevenu moyen : 550 euros par habitant\r\nPart de la population sans diplôme ou inférieur au Bac : 87,5% (données Insee, 2010)\r\nUne école primaire et deux collège',
  Localisation: 0,
  Lattitude: 49.768_191,
  Longitude: 4.720_605,
  Sous_titre:
    ' Découvez comment le dispositif agit sur ce territoire précurseur labellisé Cité éducative',
  Programme: 0,
  Population: 0,
  drupal_id: '66ef1294-9bcc-4ba4-9ac8-8b9a649bcf2b',
  drupal_url:
    'https://agence-cohesion-territoires.gouv.fr/sur-les-bancs-de-la-cite-educative-de-charleville-mezieres-40',
}
export const gristProjectArrayDumb: GristProjectFields[] = [
  gristProjectDumb,
  gristProjectDumb,
]

export const drupalProjectsJson = {
  jsonapi: {
    version: '1.0',
    meta: {
      links: {
        self: {
          href: 'http://jsonapi.org/format/1.0/',
        },
      },
    },
  },
  data: [
    {
      type: 'node--project',
      id: '575f3b87-1650-47b2-8cf0-98fb46b037d1',
      links: {
        self: {
          href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1?resourceVersion=id%3A40',
        },
      },
      attributes: {
        drupal_internal__nid: 40,
        drupal_internal__vid: 40,
        langcode: 'fr',
        revision_timestamp: '2020-04-28T21:34:12+00:00',
        revision_log: null,
        status: true,
        title: 'Sur les bancs de la Cité éducative de Charleville-Mézières',
        created: '2020-04-28T21:31:04+00:00',
        changed: '2022-11-18T16:16:20+00:00',
        promote: false,
        sticky: false,
        default_langcode: true,
        revision_translation_affected: true,
        metatag: null,
        path: {
          alias:
            '/sur-les-bancs-de-la-cite-educative-de-charleville-mezieres-40',
          pid: 248,
          langcode: 'fr',
        },
        field_agenda_txtfs: null,
        field_department_city_txtps: 'Charleville-Mézières (Ardennes)',
        field_description_txtps:
          'La Cité éducative de Charleville-Mézières : le quartier prioritaire de la Ronde-Couture\r\n7 500 habitants\r\nTaux de pauvreté : 46,9%\r\nRevenu moyen : 550 euros par habitant\r\nPart de la population sans diplôme ou inférieur au Bac : 87,5% (données Insee, 2010)\r\nUne école primaire et deux collège',
        field_display_update_date: false,
        field_funding_txtpl: null,
        field_geocoding: {
          address_name: '',
          street: '',
          zipcode: '',
          city: 'Charleville-Mézières',
          country: '',
          additional: '',
          lat: 49.768_191,
          lon: 4.720_605,
          feature:
            '{"type":"Feature","geometry":{"type":"Point","coordinates":[4.720605,49.768191]},"properties":{"label":"Charleville-Mézières","score":0.7841351948051947,"id":"08105","type":"municipality","name":"Charleville-Mézières","postcode":"08000","citycode":"08105","x":824027.66,"y":6964602.11,"population":46682,"city":"Charleville-Mézières","context":"08, Ardennes, Grand Est","importance":0.48263}}',
        },
        field_label_txt: 'Charleville-Mézières (08)',
        field_localization_txtps: 'Charleville-Mézières (08)',
        field_metatags: null,
        field_program_title_txtps: 'Programme',
        field_program_txtps: 'Cités éducatives',
        field_teaser_txtps:
          ' Découvez comment le dispositif agit sur ce territoire précurseur labellisé Cité éducative',
      },
      relationships: {
        node_type: {
          data: {
            type: 'node_type--node_type',
            id: '73ecc99a-79c1-415f-836a-99b049f563a6',
            meta: {
              drupal_internal__target_id: 'project',
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/node_type?resourceVersion=id%3A40',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/relationships/node_type?resourceVersion=id%3A40',
            },
          },
        },
        revision_uid: {
          data: {
            type: 'user--user',
            id: '933c701f-5b65-41c0-b107-85bf1470a765',
            meta: {
              drupal_internal__target_id: 17,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/revision_uid?resourceVersion=id%3A40',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/relationships/revision_uid?resourceVersion=id%3A40',
            },
          },
        },
        uid: {
          data: {
            type: 'user--user',
            id: '933c701f-5b65-41c0-b107-85bf1470a765',
            meta: {
              drupal_internal__target_id: 17,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/uid?resourceVersion=id%3A40',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/relationships/uid?resourceVersion=id%3A40',
            },
          },
        },
        field_content_par: {
          data: [
            {
              type: 'paragraph--wysiwyg',
              id: '19750407-b858-4a1f-8528-9cfb45d3e651',
              meta: {
                target_revision_id: 59,
                drupal_internal__target_id: 59,
              },
            },
            {
              type: 'paragraph--file_attached',
              id: '9de6cc26-aca3-4855-b377-ea1cb453740a',
              meta: {
                target_revision_id: 60,
                drupal_internal__target_id: 60,
              },
            },
            {
              type: 'paragraph--wysiwyg',
              id: '40feb265-1722-4b8c-aa93-ebfb4a08f28c',
              meta: {
                target_revision_id: 112,
                drupal_internal__target_id: 112,
              },
            },
            {
              type: 'paragraph--associated_program',
              id: 'cd094a5c-9752-4387-99d2-e5f680288402',
              meta: {
                target_revision_id: 113,
                drupal_internal__target_id: 113,
              },
            },
          ],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/field_content_par?resourceVersion=id%3A40',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/relationships/field_content_par?resourceVersion=id%3A40',
            },
          },
        },
        field_department: {
          data: {
            type: 'taxonomy_term--region',
            id: 'b159bdfb-9b0f-4490-8a96-5b3a4717373f',
            meta: {
              drupal_internal__target_id: 285,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/field_department?resourceVersion=id%3A40',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/relationships/field_department?resourceVersion=id%3A40',
            },
          },
        },
        field_file_media: {
          data: null,
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/field_file_media?resourceVersion=id%3A40',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/relationships/field_file_media?resourceVersion=id%3A40',
            },
          },
        },
        field_image_med: {
          data: {
            type: 'media--image',
            id: 'e88df15a-9f83-4b15-833a-16e3dfd57d2a',
            meta: {
              drupal_internal__target_id: 29,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/field_image_med?resourceVersion=id%3A40',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/relationships/field_image_med?resourceVersion=id%3A40',
            },
          },
        },
        field_keywords_term: {
          data: [
            {
              type: 'taxonomy_term--keywords',
              id: '7a951e3a-d14b-404a-9a89-5aa05efa43e0',
              meta: {
                drupal_internal__target_id: 166,
              },
            },
          ],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/field_keywords_term?resourceVersion=id%3A40',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/relationships/field_keywords_term?resourceVersion=id%3A40',
            },
          },
        },
        field_list_page_eref: {
          data: null,
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/field_list_page_eref?resourceVersion=id%3A40',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/relationships/field_list_page_eref?resourceVersion=id%3A40',
            },
          },
        },
        field_profiles_term_m: {
          data: [],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/field_profiles_term_m?resourceVersion=id%3A40',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/relationships/field_profiles_term_m?resourceVersion=id%3A40',
            },
          },
        },
        field_program_term_m: {
          data: [
            {
              type: 'taxonomy_term--program',
              id: '9145d3d8-ff29-42cb-854a-f90e560d39ad',
              meta: {
                drupal_internal__target_id: 115,
              },
            },
          ],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/field_program_term_m?resourceVersion=id%3A40',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/relationships/field_program_term_m?resourceVersion=id%3A40',
            },
          },
        },
        field_publics_term_m: {
          data: [],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/field_publics_term_m?resourceVersion=id%3A40',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/relationships/field_publics_term_m?resourceVersion=id%3A40',
            },
          },
        },
        field_region_term: {
          data: {
            type: 'taxonomy_term--region',
            id: 'cde4c7c3-c194-4fb2-b62a-7d0cf58db9c3',
            meta: {
              drupal_internal__target_id: 227,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/field_region_term?resourceVersion=id%3A40',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/relationships/field_region_term?resourceVersion=id%3A40',
            },
          },
        },
        field_secondary_content_par: {
          data: [],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/field_secondary_content_par?resourceVersion=id%3A40',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/relationships/field_secondary_content_par?resourceVersion=id%3A40',
            },
          },
        },
        field_secondary_image_media: {
          data: {
            type: 'media--image',
            id: '59fd5f15-07b4-47dd-9b79-493d13064176',
            meta: {
              drupal_internal__target_id: 688,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/field_secondary_image_media?resourceVersion=id%3A40',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/relationships/field_secondary_image_media?resourceVersion=id%3A40',
            },
          },
        },
        field_territories_term_m: {
          data: [
            {
              type: 'taxonomy_term--territory',
              id: '377a20c2-a8b0-481e-812e-13b39e6aebb6',
              meta: {
                drupal_internal__target_id: 61,
              },
            },
          ],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/field_territories_term_m?resourceVersion=id%3A40',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/relationships/field_territories_term_m?resourceVersion=id%3A40',
            },
          },
        },
        field_thematics_term_m: {
          data: [
            {
              type: 'taxonomy_term--thematic',
              id: '0561ee7b-ccbe-41a0-b5a0-ce66a5986915',
              meta: {
                drupal_internal__target_id: 48,
              },
            },
          ],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/field_thematics_term_m?resourceVersion=id%3A40',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/575f3b87-1650-47b2-8cf0-98fb46b037d1/relationships/field_thematics_term_m?resourceVersion=id%3A40',
            },
          },
        },
      },
    },
    {
      type: 'node--project',
      id: '7637cccb-29a3-4875-a524-305d4b283b9d',
      links: {
        self: {
          href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d?resourceVersion=id%3A64',
        },
      },
      attributes: {
        drupal_internal__nid: 64,
        drupal_internal__vid: 64,
        langcode: 'fr',
        revision_timestamp: '2020-05-07T18:56:10+00:00',
        revision_log: null,
        status: true,
        title:
          "Coeur de Flandre : un territoire d'industrie qui mise sur la qualification et l'innovation",
        created: '2020-05-07T18:42:06+00:00',
        changed: '2022-11-18T12:36:51+00:00',
        promote: false,
        sticky: false,
        default_langcode: true,
        revision_translation_affected: true,
        metatag: null,
        path: {
          alias:
            '/coeur-de-flandre-un-territoire-dindustrie-qui-mise-sur-la-qualification-et-linnovation-64',
          pid: 324,
          langcode: 'fr',
        },
        field_agenda_txtfs: null,
        field_department_city_txtps: 'Pas-de-Calais (62) ',
        field_description_txtps:
          'Saint-Omer est une commune française, sous-préfecture du département du Pas-de-Calais en région Hauts-de-France. Avec une population de 14 782 habitants en 2017, elle est la 11ᵉ ville du Pas-de-Calais. Elle est également la ville la plus peuplée de son aire urbaine qui compte en 2015, 91 256 habitants',
        field_display_update_date: false,
        field_funding_txtpl: null,
        field_geocoding: {
          address_name: 'La Station',
          street: 'Place du 8 Mai',
          zipcode: '62500',
          city: 'Saint-Omer',
          country: '',
          additional: '',
          lat: 50.753_363,
          lon: 2.266_572,
          feature:
            '{"type":"Feature","geometry":{"type":"Point","coordinates":[2.266572,50.753363]},"properties":{"label":"Place du 8 Mai 1945 62500 Saint-Omer","score":0.723512307865921,"id":"62765_1075","type":"street","x":648147.44,"y":7073212.56,"importance":0.4586353865251314,"name":"Place du 8 Mai 1945","postcode":"62500","citycode":"62765","city":"Saint-Omer","context":"62, Pas-de-Calais, Hauts-de-France"}}',
        },
        field_label_txt: 'Pays de Saint-Omer (62) ',
        field_localization_txtps: 'Pays de Saint-Omer (62) ',
        field_metatags: null,
        field_program_title_txtps: 'Programme',
        field_program_txtps: "Territoires d'industrie",
        field_teaser_txtps:
          'Situé sur deux départements, le territoire d’industrie Cœur de Flandre - Pays de Saint-Omer jouit d’une forte dynamique, soutenue par l’implication des services de l’État, de la Région, des intercommunalités et des industriels.',
      },
      relationships: {
        node_type: {
          data: {
            type: 'node_type--node_type',
            id: '73ecc99a-79c1-415f-836a-99b049f563a6',
            meta: {
              drupal_internal__target_id: 'project',
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/node_type?resourceVersion=id%3A64',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/relationships/node_type?resourceVersion=id%3A64',
            },
          },
        },
        revision_uid: {
          data: {
            type: 'user--user',
            id: '933c701f-5b65-41c0-b107-85bf1470a765',
            meta: {
              drupal_internal__target_id: 17,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/revision_uid?resourceVersion=id%3A64',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/relationships/revision_uid?resourceVersion=id%3A64',
            },
          },
        },
        uid: {
          data: {
            type: 'user--user',
            id: '933c701f-5b65-41c0-b107-85bf1470a765',
            meta: {
              drupal_internal__target_id: 17,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/uid?resourceVersion=id%3A64',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/relationships/uid?resourceVersion=id%3A64',
            },
          },
        },
        field_content_par: {
          data: [
            {
              type: 'paragraph--wysiwyg',
              id: '69d448c0-f350-4b8a-b0dd-c90a2f9f54cf',
              meta: {
                target_revision_id: 128,
                drupal_internal__target_id: 128,
              },
            },
            {
              type: 'paragraph--associated_program',
              id: 'c1a499a8-3d3c-42e3-8153-1de8de48ed8d',
              meta: {
                target_revision_id: 129,
                drupal_internal__target_id: 129,
              },
            },
          ],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/field_content_par?resourceVersion=id%3A64',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/relationships/field_content_par?resourceVersion=id%3A64',
            },
          },
        },
        field_department: {
          data: {
            type: 'taxonomy_term--region',
            id: 'd0a69d6f-b6e7-4c37-ade3-7d590a1b5f57',
            meta: {
              drupal_internal__target_id: 340,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/field_department?resourceVersion=id%3A64',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/relationships/field_department?resourceVersion=id%3A64',
            },
          },
        },
        field_file_media: {
          data: null,
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/field_file_media?resourceVersion=id%3A64',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/relationships/field_file_media?resourceVersion=id%3A64',
            },
          },
        },
        field_image_med: {
          data: {
            type: 'media--image',
            id: 'fb781852-9c35-4d37-9c90-3e67828cf43c',
            meta: {
              drupal_internal__target_id: 66,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/field_image_med?resourceVersion=id%3A64',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/relationships/field_image_med?resourceVersion=id%3A64',
            },
          },
        },
        field_keywords_term: {
          data: [
            {
              type: 'taxonomy_term--keywords',
              id: '7a951e3a-d14b-404a-9a89-5aa05efa43e0',
              meta: {
                drupal_internal__target_id: 166,
              },
            },
          ],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/field_keywords_term?resourceVersion=id%3A64',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/relationships/field_keywords_term?resourceVersion=id%3A64',
            },
          },
        },
        field_list_page_eref: {
          data: {
            type: 'node--list',
            id: 'de832c2c-5fb1-4ce7-86ae-8db8c6b734fb',
            meta: {
              drupal_internal__target_id: 15,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/field_list_page_eref?resourceVersion=id%3A64',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/relationships/field_list_page_eref?resourceVersion=id%3A64',
            },
          },
        },
        field_profiles_term_m: {
          data: [],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/field_profiles_term_m?resourceVersion=id%3A64',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/relationships/field_profiles_term_m?resourceVersion=id%3A64',
            },
          },
        },
        field_program_term_m: {
          data: [
            {
              type: 'taxonomy_term--program',
              id: 'fd0d8037-343a-486b-b83a-b6e017455213',
              meta: {
                drupal_internal__target_id: 149,
              },
            },
            {
              type: 'taxonomy_term--program',
              id: '001b712c-513b-41fc-8f0c-da850e96c820',
              meta: {
                drupal_internal__target_id: 151,
              },
            },
          ],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/field_program_term_m?resourceVersion=id%3A64',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/relationships/field_program_term_m?resourceVersion=id%3A64',
            },
          },
        },
        field_publics_term_m: {
          data: [],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/field_publics_term_m?resourceVersion=id%3A64',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/relationships/field_publics_term_m?resourceVersion=id%3A64',
            },
          },
        },
        field_region_term: {
          data: {
            type: 'taxonomy_term--region',
            id: '350d324e-ece1-451b-b651-60528316616c',
            meta: {
              drupal_internal__target_id: 228,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/field_region_term?resourceVersion=id%3A64',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/relationships/field_region_term?resourceVersion=id%3A64',
            },
          },
        },
        field_secondary_content_par: {
          data: [],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/field_secondary_content_par?resourceVersion=id%3A64',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/relationships/field_secondary_content_par?resourceVersion=id%3A64',
            },
          },
        },
        field_secondary_image_media: {
          data: {
            type: 'media--image',
            id: 'e97a3d29-568b-4fde-a32b-c1f93519676d',
            meta: {
              drupal_internal__target_id: 794,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/field_secondary_image_media?resourceVersion=id%3A64',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/relationships/field_secondary_image_media?resourceVersion=id%3A64',
            },
          },
        },
        field_territories_term_m: {
          data: [
            {
              type: 'taxonomy_term--territory',
              id: 'f557ec87-95d3-470d-9679-baa460e510c2',
              meta: {
                drupal_internal__target_id: 59,
              },
            },
          ],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/field_territories_term_m?resourceVersion=id%3A64',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/relationships/field_territories_term_m?resourceVersion=id%3A64',
            },
          },
        },
        field_thematics_term_m: {
          data: [
            {
              type: 'taxonomy_term--thematic',
              id: '44da24bf-b3d6-4e49-be98-41207fbf4475',
              meta: {
                drupal_internal__target_id: 46,
              },
            },
          ],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/field_thematics_term_m?resourceVersion=id%3A64',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/7637cccb-29a3-4875-a524-305d4b283b9d/relationships/field_thematics_term_m?resourceVersion=id%3A64',
            },
          },
        },
      },
    },
    {
      type: 'node--project',
      id: 'a6974f0c-2a93-4b69-b94d-67085896187f',
      links: {
        self: {
          href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f?resourceVersion=id%3A71',
        },
      },
      attributes: {
        drupal_internal__nid: 71,
        drupal_internal__vid: 71,
        langcode: 'fr',
        revision_timestamp: '2020-05-12T15:25:10+00:00',
        revision_log: null,
        status: false,
        title: 'Le renouveau d’une cité minière',
        created: '2020-05-12T14:51:30+00:00',
        changed: '2022-09-15T14:42:57+00:00',
        promote: false,
        sticky: false,
        default_langcode: true,
        revision_translation_affected: true,
        metatag: null,
        path: {
          alias: '/le-renouveau-dune-cite-miniere-71',
          pid: 347,
          langcode: 'fr',
        },
        field_agenda_txtfs: null,
        field_department_city_txtps: 'Nord (59)',
        field_description_txtps: null,
        field_display_update_date: true,
        field_funding_txtpl: null,
        field_geocoding: {
          address_name: '',
          street: '',
          zipcode: '',
          city: 'Raismes',
          country: '',
          additional: '',
          lat: 50.371_981,
          lon: 3.495_915,
          feature:
            '{"type":"Feature","geometry":{"type":"Point","coordinates":[3.495915,50.371981]},"properties":{"label":"Rue de Raismes 59410 Anzin","score":0.6777263636363635,"id":"59014_0885","type":"street","x":735327.79,"y":7030589.74,"importance":0.45499,"name":"Rue de Raismes","postcode":"59410","citycode":"59014","city":"Anzin","context":"59, Nord, Hauts-de-France"}}',
        },
        field_label_txt: 'Raismes (59)',
        field_localization_txtps: 'Raismes (59)',
        field_metatags: null,
        field_program_title_txtps: 'Programme',
        field_program_txtps: 'Renouveau du bassin minier',
        field_teaser_txtps:
          'Après 200 ans d’exploitation minière qui ont fait de la France une grande puissance industrielle, le bassin minier entre dans une longue période de récession au début des années 1960.',
      },
      relationships: {
        node_type: {
          data: {
            type: 'node_type--node_type',
            id: '73ecc99a-79c1-415f-836a-99b049f563a6',
            meta: {
              drupal_internal__target_id: 'project',
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/node_type?resourceVersion=id%3A71',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/relationships/node_type?resourceVersion=id%3A71',
            },
          },
        },
        revision_uid: {
          data: {
            type: 'user--user',
            id: 'ecb196d4-23d0-45f7-9f93-6aeb5ca0973a',
            meta: {
              drupal_internal__target_id: 24,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/revision_uid?resourceVersion=id%3A71',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/relationships/revision_uid?resourceVersion=id%3A71',
            },
          },
        },
        uid: {
          data: {
            type: 'user--user',
            id: 'ecb196d4-23d0-45f7-9f93-6aeb5ca0973a',
            meta: {
              drupal_internal__target_id: 24,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/uid?resourceVersion=id%3A71',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/relationships/uid?resourceVersion=id%3A71',
            },
          },
        },
        field_content_par: {
          data: [
            {
              type: 'paragraph--wysiwyg',
              id: '83f38f88-ef46-4737-8f2b-005425f852c0',
              meta: {
                target_revision_id: 150,
                drupal_internal__target_id: 150,
              },
            },
            {
              type: 'paragraph--associated_program',
              id: 'e848fc32-965e-4fa5-a7b6-a8e1c928494f',
              meta: {
                target_revision_id: 342,
                drupal_internal__target_id: 342,
              },
            },
          ],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/field_content_par?resourceVersion=id%3A71',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/relationships/field_content_par?resourceVersion=id%3A71',
            },
          },
        },
        field_department: {
          data: {
            type: 'taxonomy_term--region',
            id: 'bf613f28-3d31-4e36-a7c2-1b01a19e8ea3',
            meta: {
              drupal_internal__target_id: 337,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/field_department?resourceVersion=id%3A71',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/relationships/field_department?resourceVersion=id%3A71',
            },
          },
        },
        field_file_media: {
          data: null,
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/field_file_media?resourceVersion=id%3A71',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/relationships/field_file_media?resourceVersion=id%3A71',
            },
          },
        },
        field_image_med: {
          data: {
            type: 'media--image',
            id: 'b50d4fc4-7932-4d17-a589-f46d4e7e0298',
            meta: {
              drupal_internal__target_id: 80,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/field_image_med?resourceVersion=id%3A71',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/relationships/field_image_med?resourceVersion=id%3A71',
            },
          },
        },
        field_keywords_term: {
          data: [
            {
              type: 'taxonomy_term--keywords',
              id: '7a951e3a-d14b-404a-9a89-5aa05efa43e0',
              meta: {
                drupal_internal__target_id: 166,
              },
            },
          ],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/field_keywords_term?resourceVersion=id%3A71',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/relationships/field_keywords_term?resourceVersion=id%3A71',
            },
          },
        },
        field_list_page_eref: {
          data: {
            type: 'node--list',
            id: 'de832c2c-5fb1-4ce7-86ae-8db8c6b734fb',
            meta: {
              drupal_internal__target_id: 15,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/field_list_page_eref?resourceVersion=id%3A71',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/relationships/field_list_page_eref?resourceVersion=id%3A71',
            },
          },
        },
        field_profiles_term_m: {
          data: [],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/field_profiles_term_m?resourceVersion=id%3A71',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/relationships/field_profiles_term_m?resourceVersion=id%3A71',
            },
          },
        },
        field_program_term_m: {
          data: [
            {
              type: 'taxonomy_term--program',
              id: '3f264882-ab06-419e-b217-26c75924e9e9',
              meta: {
                drupal_internal__target_id: 192,
              },
            },
          ],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/field_program_term_m?resourceVersion=id%3A71',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/relationships/field_program_term_m?resourceVersion=id%3A71',
            },
          },
        },
        field_publics_term_m: {
          data: [],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/field_publics_term_m?resourceVersion=id%3A71',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/relationships/field_publics_term_m?resourceVersion=id%3A71',
            },
          },
        },
        field_region_term: {
          data: {
            type: 'taxonomy_term--region',
            id: '350d324e-ece1-451b-b651-60528316616c',
            meta: {
              drupal_internal__target_id: 228,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/field_region_term?resourceVersion=id%3A71',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/relationships/field_region_term?resourceVersion=id%3A71',
            },
          },
        },
        field_secondary_content_par: {
          data: [],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/field_secondary_content_par?resourceVersion=id%3A71',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/relationships/field_secondary_content_par?resourceVersion=id%3A71',
            },
          },
        },
        field_secondary_image_media: {
          data: {
            type: 'media--image',
            id: 'abe2e12c-97e3-4a43-9eed-77d8c04523b6',
            meta: {
              drupal_internal__target_id: 722,
            },
          },
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/field_secondary_image_media?resourceVersion=id%3A71',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/relationships/field_secondary_image_media?resourceVersion=id%3A71',
            },
          },
        },
        field_territories_term_m: {
          data: [
            {
              type: 'taxonomy_term--territory',
              id: '003b6829-5287-4e27-90ee-038cc7d058a0',
              meta: {
                drupal_internal__target_id: 57,
              },
            },
            {
              type: 'taxonomy_term--territory',
              id: '4577044a-a5fc-4cd9-9d44-36288340b4ff',
              meta: {
                drupal_internal__target_id: 193,
              },
            },
          ],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/field_territories_term_m?resourceVersion=id%3A71',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/relationships/field_territories_term_m?resourceVersion=id%3A71',
            },
          },
        },
        field_thematics_term_m: {
          data: [
            {
              type: 'taxonomy_term--thematic',
              id: '1569c10a-161d-4dce-8fd7-0f66b91cb97d',
              meta: {
                drupal_internal__target_id: 184,
              },
            },
          ],
          links: {
            related: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/field_thematics_term_m?resourceVersion=id%3A71',
            },
            self: {
              href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project/a6974f0c-2a93-4b69-b94d-67085896187f/relationships/field_thematics_term_m?resourceVersion=id%3A71',
            },
          },
        },
      },
    },
  ],
  links: {
    next: {
      href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project?page%5Boffset%5D=50&page%5Blimit%5D=50',
    },
    self: {
      href: 'https://agence-cohesion-territoires.gouv.fr/jsonapi/node/project?page%5Blimit%5D=200',
    },
  },
}
