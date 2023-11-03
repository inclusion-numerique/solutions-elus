import type { Schema, Attribute } from '@strapi/strapi'

export interface ProjetPersonne extends Schema.Component {
  collectionName: 'components_projet_personnes'
  info: {
    displayName: 'Personne'
    icon: 'user'
  }
  attributes: {
    name: Attribute.String & Attribute.Required
    quality: Attribute.String
    email: Attribute.Email & Attribute.Required
    phone: Attribute.String
  }
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'projet.personne': ProjetPersonne
    }
  }
}
