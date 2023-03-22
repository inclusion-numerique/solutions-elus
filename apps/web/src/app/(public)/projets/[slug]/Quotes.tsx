import { ProjectItem } from '@sde/web/legacyProject/projectsList'
import React from 'react'
import { isDefinedAndNotNull } from '@sde/web/utils/isDefinedAndNotNull'
import Quote, { QuoteData } from './Quote'

const quoteFromProjectData = (
  text: string | null,
  name: string | null,
  image: string | null,
): QuoteData | null => {
  if (!text || !name) {
    return null
  }
  return { text, name, image: image || null }
}

const projectToQuotes = ({
  localActor1Text,
  localActor1Name,
  localActor1Image,
  localActor2Text,
  localActor2Name,
  localActor2Image,
  partner1Text,
  partner1Name,
  partner1Image,
  partner2Text,
  partner2Name,
  partner2Image,
}: ProjectItem) => ({
  local: [
    quoteFromProjectData(localActor1Text, localActor1Name, localActor1Image),
    quoteFromProjectData(localActor2Text, localActor2Name, localActor2Image),
  ].filter(isDefinedAndNotNull),
  partner: [
    quoteFromProjectData(partner1Text, partner1Name, partner1Image),
    quoteFromProjectData(partner2Text, partner2Name, partner2Image),
  ].filter(isDefinedAndNotNull),
})

const Quotes = ({ project }: { project: ProjectItem }) => {
  const { local, partner } = projectToQuotes(project)

  const hasLocalActorQuote = local.length > 0
  const hasPartnerQuote = partner.length > 0

  if (!hasLocalActorQuote && !hasPartnerQuote) {
    return null
  }

  return (
    <>
      {hasLocalActorQuote ? (
        <>
          <h2 className="fr-text-title--blue-france fr-mt-12v">
            La parole aux acteurs locaux
          </h2>
          {local.map((quote, index) => (
            <Quote
              className="fr-mt-4v"
              key={quote.name}
              quote={quote}
              hideSeparator={!hasPartnerQuote && index === local.length - 1}
            />
          ))}
        </>
      ) : null}
      {hasPartnerQuote ? (
        <>
          <h2 className="fr-text-title--blue-france fr-mt-12v">
            La parole aux partenaires des collectivités
          </h2>
          {partner.map((quote, index) => (
            <Quote
              className="fr-mt-4v"
              key={quote.name}
              quote={quote}
              hideSeparator={index === local.length - 1}
            />
          ))}
        </>
      ) : null}
      <hr className="fr-mt-12v" />
    </>
  )
}

export default Quotes
