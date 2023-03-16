import {DrupalProjectType, GristProjectType} from "./Types";
import {drupalProjectsJson} from "./convertDrupalProjectsToGristProject.spec";
import { GristProjectFields } from '@sde/cli/grist/grist'

export const convertDrupalProjectsToGristProjects = (drupalProjectArray: DrupalProjectType[]) : GristProjectType[] => {
    return drupalProjectArray.map(convertToGristProject)
}

export const convertJSONToDrupalProjects = (json: typeof drupalProjectsJson) : DrupalProjectType[] => {
    return json.data.map((project)=>{
        return project.attributes
    })
}

export const convertToGristProject = (drupalProject: DrupalProjectType) : GristProjectFields => {
    return {
        title: drupalProject.title,
        createdAt: drupalProject.created,
        localizationDescription: drupalProject.field_description_txtps,
        localization: drupalProject.field_geocoding.city,
        geocoding: {
            lat: drupalProject.field_geocoding.lat,
            long: drupalProject.field_geocoding.lon
        },
        subtitle: drupalProject.field_teaser_txtps,
        program: drupalProject.field_program_txtps
    }
}
