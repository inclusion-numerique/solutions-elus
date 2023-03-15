import { District } from '@sde/web/projethoteque/legacyProjects'
import { useDistrictFilters } from '@sde/web/legacyProject/projectFiltersStore'

export const ProjectMap = () => {
  const selectedDistricts = useDistrictFilters(({ selected }) => selected)
  const toggleDistrict = useDistrictFilters(({ toggle }) => toggle)
  // const [_hovered, setHovered] = useState<District | null>(null)

  const getFill = (district: District) => {
    if (selectedDistricts.has(district)) {
      return 'var(--text-action-high-blue-france)'
    }

    return 'var(--blue-france-850-200)'
  }

  const getTextFill = (district: District, outside: boolean) => {
    if (outside) {
      return 'var(--text-action-high-blue-france)'
    }

    return selectedDistricts.has(district)
      ? 'white'
      : 'var(--text-action-high-blue-france)'
  }

  const regionPathProps = (district: District) => ({
    fill: getFill(district),
    onClick: () => toggleDistrict(district),
    // onMouseEnter: () => {
    //   setHovered(district)
    // },
    // onMouseLeave: () => {
    //   setHovered(null)
    // },
  })

  const districtTextProps = (district: District, outside = false) => {
    const fill = getTextFill(district, outside)
    if (outside) {
      return {
        fill,
        cursor: 'pointer',
        onClick: () => toggleDistrict(district),
        // onMouseEnter: () => {
        //   setHovered(district)
        // },
        // onMouseLeave: () => {
        //   setHovered(null)
        // },
      }
    }
    return {
      fill,
      pointerEvents: 'none',
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 442 330"
        enableBackground="new 0 0 442 330"
        aria-hidden="true"
        fontSize={7}
        fontWeight={500}
      >
        <g className="fr-pdl">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps('Pays de la Loire')}
            d="M134.8,164.7c1.9,2.2,4.1,3.3,7.2,2.7c2.3-0.5,3.6,0,4.3,1.4
    c0.9-0.8,1.7-1.8,2.7-2.4c1.2-0.7,2.5-0.9,3.9-0.6c1.4,0.3,2.7,1.1,4.1,1.5c1,0.3,2.4,0.2,3-0.9c0.5-0.9-0.5-1.6-1.1-2.1
    c-0.8-0.7-1.4-1.5-1.6-2.5c-0.2-1.1,0.1-2.3,0.3-3.4c0.3-1.1,0.5-2.2,0.1-3.3c-0.3-1.1-1.1-2-1.7-2.9c-1.3-1.8-2.7-3.8-2.4-6.1
    c0.3-2.2,2.2-3.3,4.2-3.7c1-0.2,2-0.2,3-0.5c1.2-0.3,2.3-0.8,3.4-1.4c3.3-1.7,7.1-4.4,10.9-3.7c-0.1-0.6-0.2-1.3-0.2-2
    c-0.1-3.3,1.2-6.6,3-9.3c2-3.1,4.8-5.1,7.9-7.1c1.5-1,3-1.9,4.3-3.1c1.4-1.3,2.4-2.7,3.2-4.4c0.9-1.7,1.6-3.4,2.2-5.2
    c0.4-1.2,0.7-2.8-0.1-3.9c-0.1,0.1-0.3,0.2-0.5,0.1c-4-0.2-7.7-2.3-9.9-5.6c-1-1.5-1.5-4.2-3.5-4.5c-2.3-0.3-4,1.8-5.2,3.3
    c-0.5,0.6-1.5,0.1-1.5-0.6c-0.3-3.5-4-6.3-7.4-5.9c-1.9,0.2-3.5,1.4-5.2,2.2c-1.6,0.7-3.3,0.9-5.1,0.4c-1.6-0.4-3.1-1.3-4.6-1.9
    c-0.4-0.2-0.9-0.4-1.4-0.5c0,0.3-0.1,0.6-0.4,0.8c-2.2,1.4-2.2,4.6-1.8,6.8c0.5,2.9,1.6,6,0.7,9c-0.4,1.4-1.4,2.3-2.2,3.4
    c-0.7,1-0.7,2.1-0.5,3.3c0.4,2.1,0.9,4.8-1.5,6c-2.7,1.2-5-1.2-7.1-2.5c-1-0.6-2.2-1.1-3.3-0.3c-0.7,0.5-1.2,1.3-1.6,2
    c-1,1.5-2.2,3.2-4.3,2.9c-0.7-0.1-1.3-0.4-1.9-0.7c-0.5-0.2-1-0.5-1.5-0.5c-1,0.1-1.7,1.2-2.2,2c-0.6,1.1-1.1,2.2-1.8,3.2
    c-0.8,1.1-1.6,2.2-2.6,3.1c-1.2,1.1-2.5,2-4,2.8c0.2,3,1.4,3.8,4.7,3.7c1.6,0,3.2-0.7,5.2,0c-2.5,2.2-2.2,4.2-0.2,6.1
    c0.3,0.3,0.5,0.8,0.6,1.3c0.3,0.9,0.8,1.9,0.2,2.7c-0.7,1.2-1.7,0.2-2.5-0.1c-0.7-0.2-1.4-0.6-1.9,0.1c-0.5,0.6-0.3,1.4,0,2
    c0.5,0.9,1.1,1.9,1.8,2.6c4.2,3.6,7.3,8,9.6,13C133.2,162.9,134.1,163.8,134.8,164.7"
           />
          <text
            transform="matrix(1 0 0 1 151 111)"
            {...districtTextProps('Pays de la Loire')}
          >
            PAYS DE
          </text>
          <text
            transform="matrix(1 0 0 1 151 119)"
            {...districtTextProps('Pays de la Loire')}
          >
            LA LOIRE
          </text>
        </g>

        <g className="fr-naq">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps('Nouvelle-Aquitaine')}
            d="M172.3,277.3c0.5-1.4,1.1-2.7,1.3-4.1s-0.1-2.6-1-3.6
        c-0.8-0.9-1.7-1.6-2.5-2.5s-1.4-1.9-1.8-3c-0.8-2.1-1-4.6-0.2-6.7s2.4-3.8,4.3-4.9c2-1.2,4.3-1.8,6.6-2.4c2.9-0.7,5.7-1.4,8.6-2.1
        c2.3-0.6,5-1.1,6.7-2.8c1.3-1.4,1.9-3.9,0.4-5.3c-0.4-0.4-0.3-1.1,0.2-1.4c1.1-0.7,2.4-1.1,3.7-1.1c-1.4-3.9,0.5-8.2,3.2-11.2
        c1.5-1.8,3.4-3.2,5-4.9c1.5-1.6,3-3.7,2.1-5.9c-0.1-0.3,0-0.7,0.2-0.9c1.2-1.2,3-0.9,4.3-0.1c0.8,0.5,1.4,1.1,2.2,1.6
        c0.8,0.4,1.7,0.3,2.6,0c1.6-0.6,3-1.6,4.8-1.8c1.1-0.2,2.2,0,3,0.6c0.1-1.3,0.3-2.6,0.7-3.9c0.8-3,2.3-5.7,4.3-8s5.3-4.5,5.4-8
        c0-2.7-2.7-4.2-3.6-6.5c-0.4-1.2-0.2-2.6,0.4-3.7c0.7-1.1,1.8-2,2.6-3.1c1.8-2.5,1-5.9-0.1-8.6c-1.1-2.8-2.7-5.2-4.8-7.3
        c-1.9,1.2-4.4,0.6-6.4-0.1c-1.7-0.6-4.8-1.6-6,0.3c-0.2,0.4-0.8,0.6-1.2,0.3c-1.7-1.2-3.7-0.6-5.5,0c-2,0.7-3.9,1.4-6,1.1
        c-3.5-0.6-5.9-3.7-7.6-6.6c-2.1-3.5-3.9-7.2-5.9-10.8c-0.5-1-1.1-2-1.6-2.9c-0.4-0.7-0.7-1.5-1.4-1.9c-1.1-0.9-2.5,0.5-3.5,1
        c-1.4,0.6-2.8,0.2-3.5-1.2c-0.4-0.7-0.6-1.4-1.3-1.9c-0.6-0.4-1.2-0.6-1.8-0.8c-1.5-0.6-2.7-1.4-3.5-2.8c0-0.1-0.1-0.1-0.1-0.2
        c-2.2-0.9-4.9-0.1-6.9,1c-2.4,1.2-4.7,2.9-7.3,3.6c-1,0.3-2.1,0.4-3.2,0.5c-0.9,0.1-1.9,0.3-2.6,1c-1.7,1.7,0.2,4.4,1.3,5.8
        c1.4,1.8,2.7,3.7,2.4,6.1c-0.1,1.2-0.6,2.3-0.7,3.5c-0.1,1.1,0.3,1.8,1.1,2.6c0.7,0.6,1.5,1.3,1.7,2.3s-0.2,2.1-0.9,2.8
        c-1.9,1.8-4.5,0.9-6.7,0c-1.2-0.5-2.6-1-3.8-0.5c-1,0.4-1.8,1.3-2.5,2.1c-0.4,0.4-0.8,0.7-1.2,1v0.9c0,1.3,0.1,2.6-0.2,3.9
        c-0.7,4.3,1.2,8.9-1.7,13.1c-0.8,1.2-0.2,3.4,1.2,3.6c4,0.6,5.3,3.9,7.5,6.4c0.2,1.8,1.2,3.1,2.5,4.3c0.1,0.4,0.2,0.8,0.2,1.2
        c-0.2,1.3,0.7,2.6-0.3,3.8c-0.6-0.5-1-1-1.1-1.8c0-1.7-0.1-3.4-2-4.2l-2.4-3.8c-0.9-1.8-2.1-2-3.5-0.5c-1.8,2.6-2.1,5.7-2.5,8.8
        c-0.6,5.6-0.3,11.3-2.2,16.8c-0.7,2-0.2,3.5,2.5,3.3c1.3-0.1,3.3-0.3,3.3,1.7c0,1.5-1.7,1.8-3,1.9c-2.2,0.2-3,1.1-2.9,3.4
        c0.3,5.2-1.5,10-3.2,14.8c-1.7,4.6-3.9,9.3-4.3,14.2c-0.4,5.5-1.3,10-8,11.5c2.7,1.7,4.1,4.2,7.2,3.7c3.5-0.6,4.4,0.5,3.4,4
        c-1.1,4-0.1,5,4.1,5.3c1.6,0.1,3.1,0.5,4.2,1.6c1.4,1.5,3.1,1.9,5.1,1.9c3.2-0.1,6.2,0.3,7.1,4.3c0.2,1.2,1.4,1.6,2.5,1.5
        c1.5-0.2,3.1-0.3,4.6-0.6c0.3-0.1,0.5-0.1,0.8-0.1L172.3,277.3"
           />
          <text
            transform="matrix(1 0 0 1 168.035 193.9999)"
            {...districtTextProps('Nouvelle-Aquitaine')}
          >
            NOUVELLE
          </text>
          <text
            transform="matrix(1 0 0 1 168.035 201.9999)"
            {...districtTextProps('Nouvelle-Aquitaine')}
          >
            AQUITAINE
          </text>
        </g>

        <g className="fr-cvl">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps('Centre-Val de Loire')}
            d="M178.3,139.4c1.1,1,2.7,1.2,3.9,2c0.7,0.4,1.2,1,1.6,1.8
        c0.2,0.5,0.4,1.3,1.1,1.3c0.6,0,1.2-0.5,1.6-0.8c0.6-0.4,1.2-0.7,2-0.8c1.6-0.2,2.8,1,3.6,2.3c1.1,1.7,2,3.6,2.9,5.4l3.1,5.8
        c0.8,1.6,1.7,3.2,2.7,4.7c1.6,2.5,4.1,5,7.3,4.5s6.6-3,9.7-1.3c1.7-1.6,4.5-1.4,6.6-0.7c1.3,0.4,2.6,1,4,1s2.2-0.6,3-1.7
        c0.6-1,1.3-2,2.3-2.6c1.2-0.6,2.8-0.2,3.7-1.5c0.7-1.1,1.1-2.3,1.9-3.3c0.8-1,1.8-1.9,2.8-2.6c2-1.4,4.4-2.3,6.7-3.1
        c-0.3-2.2-0.2-4.4-0.2-6.7c-0.1-3.1-0.8-6.8-3.9-8.3c-0.9-0.4-0.4-1.6,0.4-1.6s0.6-1.6,0.4-2c-0.4-1.2-1.4-2.2-1.6-3.5
        c-0.2-1.2,0.3-2.1,1-3c0.4-0.4,0.7-0.9,0.7-1.5s-0.4-1.2-0.6-1.7c-0.9-2.5,0-5.1,1.4-7.3c1.3-2,3.2-3.9,3.7-6.4
        c0.3-1.5-0.4-4-2.2-4.3c-0.3,0-0.5-0.2-0.7-0.4c-1.3,1-3.2,1.4-4.8,1.6c-2.9,0.4-5.9,0.1-8.8-0.6c-0.5-0.1-0.6-0.5-0.6-0.8
        c-0.1-0.2-0.2-0.5,0-0.9c1-1.8-0.5-3.8-2.2-4.3c-2.4-0.7-4.9,0.3-7.1,1.2c-0.4,0.2-0.9,0.1-1.2-0.3c-0.1-0.1-0.1-0.3-0.1-0.5
        c-1.4-1.7-1.5-3.8-1.8-5.9c-0.1-0.9-0.3-1.8-0.7-2.5c-0.5-0.8-1.2-1.4-2-1.9c-1.6-1-3.2-1.8-4.1-3.6c-1.5-3-0.4-6.9-2.1-9.8
        c-1.5,2.2-3,4.4-4.6,6.6c0.4,0.8-0.7,1.8-1.4,1c-1.7-1.9-4.3-0.6-6,0.6c-0.7,0.5-2.2,1.4-2.2,2.3s0.9,1.7,1.3,2.4
        c1.4,2.1,0.9,4.4-0.5,6.4c-1.2,1.6-3.6,3.9-2.2,6c1.4,0.9,2,2.7,1.8,4.3c-0.2,2.1-1.2,4.2-2.1,6.1c-0.9,1.9-1.9,3.8-3.3,5.3
        c-1.3,1.5-3,2.6-4.6,3.7c-3,2-6,3.8-8.1,6.8c-1.8,2.7-3.2,6-2.9,9.3c0.1,0.7,0.2,1.4,0.5,2.1c0.1,0.1,0.2,0.1,0.3,0.1
        c0.4,0.2,0.5,0.6,0.4,1C178,139,178.1,139.2,178.3,139.4"
           />
          <text
            transform="matrix(1 0 0 1 194.3152 129.9998)"
            {...districtTextProps('Centre-Val de Loire')}
          >
            CENTRE
          </text>
          <text
            transform="matrix(1 0 0 1 194.3152 137.9998)"
            {...districtTextProps('Centre-Val de Loire')}
          >
            VAL DE LOIRE
          </text>
        </g>

        <g className="fr-cor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps('Corse')}
            d="M416,289.3c-1.8-7.2-3.1-14.4-3.7-21.7
        c-0.2-0.9-0.2-1.9-0.7-2.7c-0.9-1.6-2.4-2.8-4.4-2.4c-2.3,0.5-1.9,2.4-1.7,4c0.1,1.2,0.5,2.3,0.7,3.5c0.2,1,1,2.1-0.1,3
        c-0.9,0.7-1.8,0.1-2.6-0.3c-1.1-0.6-2.8-0.9-3.1,0.4c-0.7,3.8-3.5,4.3-6.5,5c-1.3,0.3-2.2,1.4-2.7,2.6c-1.1,2.8-4.5,5.2-1.5,8.8
        c0.3,0.3-0.1,1.4-0.4,2c-0.7,1.7-0.6,3.1,1.1,4.3c1.4,0.9,1.6,1.9,0.4,3.5c-1.8,2.4-1,4,1.9,4.3c2.3,0.2,2.6,0.9,1.7,2.8
        c-0.8,1.8-0.7,3.5,1.6,4.3c0.6,0.2,1.1,0.7,1,1.3c-0.5,5,2.5,6.1,6.7,6.3c1.1,0.1,2.1,1.5,3.2,2.1c1.5,0.9,3.2,1.2,3.7-0.9
        c1.2-6.1,3.8-12,2.4-18.4c-0.3-1.4,0-2.5,1.1-3.5C416.9,295.2,416.7,292.2,416,289.3"
           />
          <text
            transform="matrix(1 0 0 1 391.3146 295.0001)"
            {...districtTextProps('Corse')}
          >
            CORSE
          </text>
        </g>

        <g className="fr-bfc">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps('Bourgogne-Franche-Comté')}
            d="M338.7,142.4c3.8-2,6.2-5.3,6.7-9.8c0.7-5.6,0.9-6.7,4.4-7.3
        c-1.2-1.9-2.9-3.7-4.4-5.3l-7.5-8.2c-0.6,0.6-1.5,1-2.4,0.9c-1.9,0-3-1.5-4.2-2.7c-1.4-1.4-3.1-1.8-5-1.4c-2,0.5-3.5,1.7-4.8,3.2
        c-1.2,1.4-2,3-3,4.5c-0.8,1.3-1.8,2.7-3.3,3.4c-1.7,0.8-3.8,0.3-5.6,0.6c-1.8,0.3-3.5,0.8-5.3,0.9c-1.7,0-3.3-0.5-4.5-1.6
        c-1.1-1.1-1.8-2.6-2.4-4c-0.7-1.5-1.7-2.9-3.1-3.8s-2.9-1.5-4.5-1.8c-4.1-0.8-8.3,0.4-12.2,1.5c-2.9,0.8-6.7,1.4-8.7-1.4
        c-1-1.3-1.2-3.1-1.7-4.6c-0.5-1.7-1.5-2.8-2.8-3.9s-2.7-2.1-3.6-3.5c-0.3-0.5-0.6-1-0.8-1.5h-0.2c-3-0.1-6.1-0.1-9,0.4
        c-0.5,0.1-1.1,0.2-1.5,0.5c-0.5,0.4-0.5,1-0.5,1.6c0,1,0,2.1-0.6,3c2.4,0.6,3.7,3,3.6,5.4c-0.2,2.9-2.2,5.1-3.7,7.3
        c-0.8,1.2-1.6,2.6-1.8,4c-0.2,1.6,0.8,2.8,0.9,4.3c0.1,0.7-0.1,1.3-0.4,1.9c-0.3,0.5-0.8,1-1.1,1.5c-0.6,1.2,0.7,2.6,1.2,3.7
        c0.6,1.2,0.6,2.9-0.2,4c2.5,1.9,3.4,5.4,3.5,8.5c0.2,3.8-0.6,8.6,2.2,11.6c0.9,1,2.2,1.6,3.6,1.6c1.6,0,2.5-1,3.1-2.4
        c0.7-1.5,1.7-3.1,3.5-3.2c1.6-0.1,2.6,1.2,2.9,2.6c0.2,0.8,0.1,1.6,0,2.4c-0.1,0.8-0.2,1.7,0.3,2.4c0.7,1.1,2.4,1.3,3.5,1.4
        c2.5,0.2,6.3,1,6.1,4.3c-0.1,1.3-0.9,2.3-1.8,3.3c-0.8,0.9-2,1.9-2.1,3.1c-0.2,1.3,0.8,2.6,1.9,3.3c1.5,0.9,3.3,0.7,4.8,0.1
        c3.1-1.2,5.2-4.7,8.7-4.9c2.8-0.2,4.2,2.1,4.9,4.4c0.9-1.3,1.2-3.1,1.5-4.6c0.4-2,0.8-4,2-5.6c1-1.3,2.5-2.4,4.3-2.2
        c1.9,0.2,3.2,1.6,4,3.2c0.9,1.9,1,3.9,1.6,5.9c0.5,1.5,1.9,3.2,3.7,2.7c0.8-0.2,1.1-1,1.3-1.7c0.3-0.9,0.8-1.6,1.6-2.1
        c1-0.5,2.1-0.3,3.1,0.1s2,0.7,3.1,0.8c3.9,0.1,6.9-2.4,9.5-5c0.8-2.2,1.2-4.5,1.5-6.9c0.2-1.9,1.1-3.5,3-4c2.5-0.7,2.9-2.4,2.7-4.6
        C334.8,145.7,336,143.9,338.7,142.4"
           />
          <text
            transform="matrix(1 0 0 1 267.3151 136.0557)"
            {...districtTextProps('Bourgogne-Franche-Comté')}
          >
            BOURGOGNE
          </text>
          <text
            transform="matrix(1 0 0 1 267.3151 144.0557)"
            {...districtTextProps('Bourgogne-Franche-Comté')}
          >
            FRANCHE COMTE
          </text>
        </g>

        <g className="fr-ara">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps('Auvergne-Rhône-Alpes')}
            d="M355.5,201.1c-0.1-4.2-2.5-7.5-5.4-10c-4.6-4.1-5-6.1-0.7-10.5
        c2.2-2.2,1.9-5.1-0.8-5.5c-4.6-0.6-4.7-3.1-4.1-6.6c0.2-1.2-0.1-2.6-0.2-3.9c-0.1-0.8-0.5-1.6-1.3-2c-3.9-2-11.9,2.9-11.7,7.2
        c0.1,1.8,0.3,3.8-1.7,4.6c-1.5,0.6-3.4,1.2-4.7-0.3c-1.5-1.7-0.5-3.7,0.5-5.3c0.2-0.3,0.3-0.6,0.5-0.9c-2.3,1.8-4.9,3-8,2.8
        c-1.1-0.1-2.1-0.4-3.2-0.8c-0.9-0.3-1.9-0.7-2.5,0.4c-0.4,0.8-0.6,1.7-1.2,2.4c-0.6,0.6-1.4,0.9-2.2,1c-1.7,0.1-3.4-0.9-4.3-2.3
        c-1.2-1.8-1.2-4-1.8-6c-0.4-1.5-1.5-3.5-3.3-3.5c-1.7,0-2.9,1.8-3.4,3.2c-0.7,1.7-0.8,3.6-1.2,5.4c-0.5,1.8-1.2,3.4-2.8,4.6
        c-0.5,0.3-1.2,0-1.3-0.5c-0.3-1.4-0.7-3.2-1.9-4.1c-1.5-1.2-3.4,0-4.7,0.9c-1.6,1.1-3,2.4-4.8,3.2c-1.6,0.7-3.6,1.1-5.3,0.5
        c-2.7-0.8-4.9-3.8-3.8-6.6c0.5-1.3,1.5-2.2,2.4-3.2c0.7-0.8,1.6-1.8,1.1-2.9c-0.6-1.1-2.2-1.4-3.3-1.5c-1.4-0.1-2.8-0.2-4.1-0.9
        c-1.4-0.7-2.2-2-2.2-3.6c-0.1-1.2,0.6-3.3-0.4-4.3c-1.4-1.2-2.6,2.1-3,2.8c-0.7,1.3-1.9,2.2-3.3,2.5c-3,0.6-5.8-1.2-7.2-3.8
        c-0.3-0.7-0.6-1.4-0.8-2.1c-2.5,0.9-5,1.9-7,3.6c-0.9,0.8-1.7,1.7-2.2,2.8c-0.6,1.1-1,2.3-2.1,3s-2.6,0.3-3.6,1.1
        c-0.7,0.6-1.2,1.5-1.7,2.3c2.3,2.2,4,4.9,5.2,7.8c1.1,2.9,1.9,6.5,0.4,9.4c-0.6,1.2-1.7,2.1-2.5,3.1c-0.7,0.9-1.2,1.9-0.8,3
        s1.4,2,2.1,2.9c0.8,1,1.4,2.1,1.5,3.4c0.4,3.2-1.8,5.8-3.9,7.9c-2.2,2.2-4.1,4.5-5.2,7.4c-1.1,2.9-1.5,6-1.2,9l0.6,5.1
        c0.2,1.2,0.6,2.4,1.7,3c1.9,1.1,4.5,0.5,6.1-1c2.1-1.9,3-4.8,3.8-7.4c0.2-0.7,1.2-0.9,1.6-0.2c1.9,2.9,4.8,4.9,8.1,5.8
        c0.1-2.4,0.5-5,2.3-6.6c1.7-1.5,4.6-2,6.3-0.3c0.8,0.8,1,1.9,1.3,2.9c0.3,0.9,0.6,1.9,1.8,1.9c1.1,0,2.2-0.6,3.2-0.9
        c1.1-0.3,2.2-0.5,3.4-0.2c2.3,0.6,3.8,2.8,4.5,4.9c0.9,2.7,0.5,5.8,1.6,8.5c0.4,1,1.1,2.1,2,2.7c1,0.7,2,0.7,3.2,0.5
        c1.2-0.3,2.5-0.5,3.6,0.3c0.9,0.6,1.4,1.6,2.4,2c1.6,0.6,3.6-0.1,5.3-0.4c1.1-0.2,2.2-0.3,3.2,0c-0.1-0.9,0-1.8,0.3-2.6
        c0.7-1.5,2.4-2.1,3.9-1.5c1.9,0.8,3,2.8,4.2,4.3c1.2,1.6,2.4,3.3,4.1,4.4c1.4,0.9,3.2,1.5,4.8,1c1.3-0.4,2.3-1.4,2.5-2.7
        c0.6-2.9-3-3.4-4.7-4.8c-1.2-1-1.5-2.5-0.9-4c0.7-1.7,2.3-3.1,3.6-4.4l4.5-4.5c1.2-1.3,2.4-2.6,3.9-3.6c1.5-1.1,3.2-1.4,5.1-1.3
        c1.5,0.1,3.5,0.5,4.6-0.8c0.8-1-0.1-2-0.9-2.7s-1.8-1.5-2.1-2.5c-0.4-1.2,0.2-2.5,1.3-3.1c1.5-0.8,3.3-0.6,4.9-0.6h10.9
        c0.5-0.9,1.3-1.6,2.5-2.2c1.4-0.7,3-0.8,4.5-1C354.3,206.1,355.6,204,355.5,201.1"
           />
          <text
            transform="matrix(1 0 0 1 267.035 197.0557)"
            {...districtTextProps('Auvergne-Rhône-Alpes')}
          >
            AUVERGNE
          </text>
          <text
            transform="matrix(1 0 0 1 267.035 205.0557)"
            {...districtTextProps('Auvergne-Rhône-Alpes')}
          >
            RHONE ALPES
          </text>
        </g>

        <g className="fr-occ">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps('Occitanie')}
            d="M278.6,268.6c0.6-1.5,2.1-2.3,3.5-3c1.1-0.5,2.6-1.1,3.1-2.4
        c0.5-1.4-0.3-2.9,0.6-4.2c0.7-1,1.9-1.3,3-1.4c0.9-0.1,2.3,0,2.7-1.1c0.4-1,0-2.4,0-3.4c0-0.6,0.1-1.2,0.3-1.8c0.2-0.6,0.6-1,1-1.5
        c0.6-0.7-0.2-1.5-0.6-2.1l-1.4-2.2l-2.8-4.4c-1.5,0.2-3.1,0.1-4.4-0.9c-0.8-0.6-1.4-1.8-2.5-1.8c-1.2,0-2.3,0.6-3.6,0.5
        c-2.2-0.3-3.9-2.1-4.8-4c-1.1-2.5-1-5.2-1.5-7.8c-0.4-2-1.6-4.5-3.8-5c-2.1-0.5-4,1.4-6.2,1.3c-1-0.1-1.9-0.6-2.5-1.4
        c-0.6-0.9-0.7-1.9-1-2.9c-0.7-1.9-2.9-1.8-4.3-0.7c-1.8,1.5-1.8,4.4-1.8,6.5c0,0.6-0.6,1-1.1,0.9c-3.6-0.7-6.8-2.7-9.1-5.4
        c-0.9,2.6-2.1,5.2-4.3,6.9c-2.1,1.6-5.2,2.1-7.6,0.9c-2.8-1.4-2.8-4.7-3.1-7.4c-0.2-1.3-0.3-2.6-0.3-4c-0.2,0-0.4-0.2-0.6-0.4
        c-0.7-1-2.3-0.7-3.2-0.3c-1.5,0.5-2.7,1.4-4.2,1.8c-1.6,0.3-3-0.2-4.3-1.2c-0.7-0.5-2-1.6-2.9-1.3c1.1,4.3-3.5,7.7-6.2,10.3
        c-3.1,3-6.4,7.8-3.8,12.1c0.4,0.7-0.3,1.4-1,1.3c-1-0.2-2.1,0-3,0.4c1.1,1.7,0.8,4.1-0.3,5.8c-1.5,2.3-4.3,3.4-6.8,4
        c-2.9,0.8-5.9,1.4-8.8,2.1c-2.3,0.6-4.8,1.1-6.9,2.2c-2.1,1.1-3.8,2.7-4.3,5c-0.6,2.3,0,4.8,1.4,6.6c1.4,2,3.8,3.2,4.3,5.7
        c0.3,1.4,0,2.9-0.4,4.3c-0.5,1.5-1.1,2.9-1.6,4.3l-5.8,15.8c1.2,0.3,2.1,1.1,2.7,2.8c0.7,2,2.3,2.3,4.3,2.2
        c4.6-0.3,9.1-1.4,13.7-0.2c1.7,0.5,4.6,0.4,4.5-2.5c0-3.3,1.7-2.8,3.6-2.1c4,1.3,7.5,3.8,11.6,5c3,0.9,5.3,3,5,7
        c-0.1,2.2,1.4,3.7,4.1,3c1.4-0.4,2.8-0.3,4.2-0.5c1.9-0.3,3.5,0,4.5,1.8c1.5,2.7,3.9,2.3,5.8,0.9c3-2.3,5.6-2,8.3,0.3
        c2.2,1.8,4.7,1.7,6.4-0.2c1.7-1.9,3.8-2.6,6.1-3.2c2.4-0.6,3.5-1.9,3-4.6c-0.9-5.2-1.5-10.5-1-15.9c0.2-2.1,0.4-4.3,2.3-5.3
        c6-3.3,11.2-7.4,15.5-12.7C273.9,269.2,276.3,268.1,278.6,268.6C278.6,268.7,278.6,268.6,278.6,268.6"
           />
          <text
            transform="matrix(1 0 0 1 205.7963 269.9962)"
            {...districtTextProps('Occitanie')}
          >
            OCCITANIE
          </text>
        </g>

        <g className="fr-pac">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps("Provence-Alpes-Côte d'Azur")}
            d="M372.9,243.7c-1.6-2-3.4-1.4-5.1-0.3c-2.1,1.4-4.1,1.4-6.3,0.2
        c-2-1.1-4.1-1.8-6.2-2.8c-3.9-1.9-5.1-4.4-4.3-8.6c0.4-2.2,1.4-4.2,2.7-6.1c2.3-3.5,1.8-5.4-2.1-7.2c-2.4-1.1-4.7-2.3-6.6-4.1
        c-1.1-1.1-1.6-2.3-1.6-3.5h-11.6c-0.8,0-3.5-0.2-3.4,1.1c0,0.5,0.5,0.9,0.8,1.2c0.5,0.4,1,0.8,1.4,1.3c0.8,0.9,1.5,2,1.2,3.2
        c-0.3,1.4-1.6,2.3-2.8,2.7c-1.7,0.6-3.5,0-5.2,0.1c-1.8,0.1-3.2,1.2-4.4,2.4c-2.9,2.8-5.7,5.6-8.5,8.5c-0.9,1-2.1,2.5-0.8,3.7
        c0.9,0.8,2.2,1.1,3.2,1.8c1.1,0.7,2,1.7,2.2,3s-0.2,2.7-0.9,3.7c-1.9,2.7-5.3,2.8-8.1,1.5c-3.3-1.5-5.1-4.8-7.2-7.5
        c-0.6-0.8-2.5-2.7-3.4-1.2c-0.6,1-0.2,2.5,0.1,3.6c0.2,0.8-0.9,1.5-1.5,0.9c-1.2-1.2-3.1-0.7-4.6-0.4l2.8,4.3
        c0.6,0.9,1.2,1.7,1.7,2.6c0.4,0.7,0.7,1.5,0.4,2.3c-0.2,0.7-0.8,1.1-1.2,1.7c-0.3,0.5-0.3,1-0.3,1.5c0,1.2,0.3,2.3,0,3.5
        c-0.3,1.2-1.2,2-2.3,2.4c-1,0.3-2.2,0.1-3.2,0.5c-1.2,0.5-0.6,2.4-0.8,3.4c-0.2,1.4-1.1,2.4-2.2,3.2c-1.2,0.8-2.7,1.2-3.8,2.1
        c-0.3,0.3-0.7,0.7-0.9,1.1l0.1,0.1c2.9,2.1,6,2.4,9.1,3.5c4.5,1.5,8.1,3,13.2,1.5c3.2-0.9,7.7,1.1,11.2,3.4
        c7.2,4.5,15.2,6.6,23.7,4.9c3.7-0.7,8.3-1,10-5.6c1.8-4.9,4.7-9,8.8-11.8c6.6-4.4,10.2-11.5,15.8-16.7
        C373.7,247.4,374.4,245.6,372.9,243.7"
           />
          <text
            transform="matrix(1 0 0 1 300.3147 258.004)"
            {...districtTextProps("Provence-Alpes-Côte d'Azur")}
          >
            PROVENCE ALPES
          </text>
          <text
            transform="matrix(1 0 0 1 300.3147 266.004)"
            {...districtTextProps("Provence-Alpes-Côte d'Azur")}
          >
            COTE D’AZUR
          </text>
        </g>

        <g className="fr-bre">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps('Bretagne')}
            d="M115.2,126.8c-0.1,0.5-0.2,1.1-0.2,1.6c1.5-0.9,2.9-2,4-3.4
        c1-1.1,1.7-2.3,2.3-3.6c0.6-1.2,1.3-2.4,2.3-3.2c0.9-0.7,2-0.9,3.1-0.5c0.9,0.3,2,1.3,3,1c0.7-0.2,1.2-1,1.6-1.6
        c0.5-0.8,1-1.6,1.7-2.3c0.7-0.8,1.6-1.3,2.6-1.5c1.3-0.2,2.6,0.4,3.7,1.2c1.1,0.8,2.1,1.8,3.5,2.2c1,0.3,2.2,0.2,2.5-1
        c0.3-1-0.2-2.2-0.3-3.3c-0.2-1.1-0.3-2.3,0.2-3.4c0.5-1.3,1.7-2.1,2.3-3.4c0.6-1.2,0.6-2.7,0.4-4c-0.3-2.6-1.2-5-1.1-7.6
        c0.1-2,0.7-4,2.2-5.3c-0.4,0-0.9,0.1-1.3,0.3c-1.6,0.7-2.8,1.9-4.4,2.5c-1.7,0.6-3.4,0.1-4.7-1.1c-1.8-1.6-2.2-3.8-2.8-5.9
        c-0.4-0.2-0.7-0.3-1.1-0.5c-1.6-0.7-3.2-1.1-4.8-0.2c-2.2,1.2-4.3,0.8-6.4-0.4c-1.4-0.9-2.8-1.5-4.4,0.2c-4.7,4.7-10,3.2-11.6-3.1
        c-0.8-3.1-1.8-5.9-5.6-5.5c-3,0.3-6.8-0.7-8.8,1.8c-3.4,4.3-8,4-11.8,2.9c-5.8-1.8-10.6,1-15.8,1.8c-3,0.5-2.4,3.7-2.9,5.9
        c-0.4,1.7,0.7,2.5,2.3,2.9c1.6,0.3,1.8,1.7,1.8,3.1c0.1,2.3,1.1,3.5,3.5,3.4c0.8,0,1.6,0.1,2.2,1c-1.2,1.9-3.2,1.6-5,2
        c-1.3,0.3-3.1,0-3.4,1.9c-0.2,1.6,1.2,2.3,2.4,2.8c2.4,0.9,3.8,2.6,4.5,5c0.7,2.5,2.3,3.2,4.9,2c3.6-1.6,7.1-1.2,10.4,1.4
        c2.6,2,5.6,3.1,8.9,3.2c2.5,0,3.8,1,3.9,3.5c0.2,2.4,1.4,2.6,3.4,1.7c1.5-0.7,3.1-1.1,4.7-1.5c1.3-0.3,2,0.1,1.7,1.7
        c-0.7,4.2-0.3,4.6,3.6,3.2C115.2,123.5,115.7,124.4,115.2,126.8"
           />
          <text
            transform="matrix(1 0 0 1 91 103)"
            {...districtTextProps('Bretagne')}
          >
            BRETAGNE
          </text>
        </g>

        <g className="fr-nor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps('Normandie')}
            d="M135.8,57.1c1.4,6.6,3.9,12.9,3.9,19.8c0,1.8,0.9,3.4,1.8,4.9
          c0.7,1.1,1.5,2.3,0.2,3.5c-1.1,1-2.4,0.8-3.6,0.3c-0.2-0.1-0.3-0.1-0.4-0.2c0,0.1,0.1,0.2,0.1,0.3c0.5,1.7,1.5,3.9,3.4,4.3
          c1.7,0.4,3.2-1.1,4.6-1.9c1.5-0.9,3.1-1.3,4.9-0.9c3.1,0.7,6.1,3.6,9.4,2.7c1.9-0.5,3.5-1.8,5.4-2.4c1.6-0.5,3.3-0.4,4.9,0.1
          c2.6,0.9,4.7,2.9,5.5,5.4c1.2-1.2,2.6-2.3,4.4-2.5c2.4-0.3,3.9,1.1,4.9,3.1c0.9,1.9,2.1,3.6,3.9,4.9c1.4,1,3.1,1.7,4.8,1.9
          c-0.9-2,0.2-4.2,1.5-5.8c1.3-1.7,3.1-3.6,1.7-5.8c-1-1.5-2.4-3.1-1.1-5c0.6-0.9,1.6-1.5,2.4-2.1c0.9-0.7,1.8-1.2,2.9-1.6
          c1.4-0.5,3-0.5,4.3,0.2v-0.1c2.7-3.4,5-7.2,7.3-10.9c0.9-1.5,1.9-2.9,2.6-4.5c0.8-1.7,1.2-3.5,1.3-5.4s0.2-3.8,0.4-5.7
          s0.2-3.8,0-5.7c-0.4-3.5-0.9-7-3.1-9.9c-0.9-1.2-2.1-2.2-3.3-3c-0.7,0.9-1.5,1.9-2.5,2.5c-5.8,3.9-12.6,4.7-19,6.5
          c-6,1.6-6.9,3-6.2,9c0.2,1.7,0.8,3.5-0.4,5.1c-1.5,1.9-8.6,4.4-10.8,3.3c-4.4-2.1-9.1-2.3-13.8-2.7c-4.8-0.5-8.4-2.2-8.9-7.7
          c-0.2-2.1-1.4-3.6-4.1-3.4c-2.6,0.3-5.1-0.5-7.3-2.1c-2.1-1.6-3.8-0.7-4.6,1.7c-0.7,2-0.9,4,0.7,5.6C135,54.2,135.5,55.5,135.8,57.1
          "
           />
          <text
            transform="matrix(1 0 0 1 153.0283 75)"
            {...districtTextProps('Normandie')}
          >
            NORMANDIE
          </text>
        </g>

        <g className="fr-hdf">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps('Hauts-de-France')}
            d="M215.8,31c-1.8,0.4-2.9,1.5-3.9,2.7c1.6,1,3,2.4,4.1,3.9
        c2.2,3.1,2.6,7.1,3.1,10.8c0.2,2.1,0.1,4.2-0.2,6.3c-0.3,2-0.2,4-0.4,6.1c-0.1,1.2-0.4,2.2-0.8,3.3c0,0.1,0.1,0.2,0.1,0.4
        c0,0.7,1,1,1.6,1c1-0.1,2-0.6,2.9-1c1.6-0.6,3.3-0.6,4.9-0.3c3,0.6,5.6,2.2,8.3,3.4c1.3,0.6,2.7,1.1,4.1,1.3c1.5,0.2,3-0.1,4.4-0.8
        c1.6-0.7,3.3-1.7,5.1-1.5c1.7,0.2,3,1.2,4,2.4c1,1.3,1.7,2.8,2.6,4.2c0.9,1.3,2.1,2.7,3.8,2.7c0.1,0,0.2,0,0.3,0.1
        c0.2-0.4,0.5-0.9,0.8-1.3c1.2-1.6,3.3-3,3.6-5.1c0.4-2.4-1.4-4.7-1.4-7.1c0-2.7,2.3-4.1,4.7-4.1c2.1,0,4.8,0.9,6.5-0.6
        c1-0.8,0.3-2-0.1-2.9c-0.5-1.3-0.4-2.5,0.5-3.6c0.7-0.9,1.8-1.5,2.6-2.4c0.6-0.8,1-1.8,1.2-2.8c0.5-2.3,0.3-5,0.6-7.4
        c-2.2-1-3.9-3.2-4.3-6c-0.4-2.9-1.6-4.9-4.9-5c-9.3-0.3-13.2-7-16.4-14.1c-1.9-4-2-4.4-6.1-2.3c-1.1,0.6-2.7,1.9-3.5,0.7
        c-1.9-2.9-6-4.1-6.4-8.2c-0.2-2.3-1.8-3-4.1-2.6c-3.6,0.6-7.3,1.1-10.9,1.5c-6.2,0.7-6.6,1.3-7.4,7.6c-0.5,4.3,0.6,8.5-0.5,12.7
        c-0.5,2.1-0.7,4.2,1.1,5.9C216.2,29.5,216.6,30.8,215.8,31"
           />
          <text
            transform="matrix(1 0 0 1 226.9551 38.0557)"
            {...districtTextProps('Hauts-de-France')}
          >
            HAUTS
          </text>
          <text
            transform="matrix(1 0 0 1 226.9551 46.0557)"
            {...districtTextProps('Hauts-de-France')}
          >
            DE FRANCE
          </text>
        </g>

        <g className="fr-idf">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps('Île-de-France')}
            d="M254.7,74.9c-1.1-1.5-1.8-3.4-3-4.9c-1.2-1.4-2.7-1.8-4.4-1.2
        c-1.7,0.6-3.3,1.6-5.1,1.9c-3.2,0.5-6.2-0.9-9-2.3c-2.6-1.3-5.5-2.9-8.5-2.6c-1.8,0.2-3.3,1.4-5.1,1.5c-1,0-2-0.3-2.6-1
        c-0.9,1.7-1.9,3.4-3,5c-0.4,0.7-0.9,1.4-1.3,2.1l0.1,0.1c1.3,1.7,1.5,3.8,1.6,5.8c0.1,1.7,0.2,3.5,1.1,5c1,1.6,2.9,2.2,4.4,3.3
        c1.5,1.2,2.1,2.8,2.4,4.7c0.2,1.7,0.2,3.8,1.4,5.2l0.1,0.1c2.6-1.1,5.5-1.9,8.2-0.8c2.3,1,3.8,3.6,2.9,5.9c2.6,0.6,5.3,0.7,8,0.3
        c1-0.2,2.1-0.4,3-1c1-0.6,1.3-1.4,1.3-2.5s0-2.3,0.8-3.2c0.8-0.8,2-1,3.1-1.2c2.9-0.3,5.8-0.4,8.7-0.4c0-0.5,0.1-1.1,0.3-1.6
        c0,0,0-0.1,0.1-0.1c-0.7,0.1-1.4-0.8-0.8-1.5c2-2.3,2.6-5.7,1.6-8.5c-0.5-1.6-1.6-3-1.5-4.8v-0.4C257.3,77.7,255.8,76.4,254.7,74.9"
           />
          <text
            transform="matrix(1 0 0 1 225.8064 80.9998)"
            {...districtTextProps('Île-de-France')}
          >
            ILE DE
          </text>
          <text
            transform="matrix(1 0 0 1 225.8064 88.9998)"
            {...districtTextProps('Île-de-France')}
          >
            FRANCE
          </text>
        </g>

        <g className="fr-ges">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps('Grand Est')}
            d="M280.6,39.3c-0.1,0.7-0.1,1.4-0.2,2.1c-0.1,2.5-0.1,5.1-1.2,7.4
        c-0.5,1-1.2,1.8-2.1,2.5c-1,0.8-1.9,1.5-1.5,2.8c0.4,1.2,1.1,2.3,0.7,3.6c-0.4,1.1-1.3,1.8-2.3,2.2s-2.2,0.6-3.3,0.5
        c-1.2-0.1-2.5-0.3-3.7-0.2c-1.1,0.1-2.1,0.7-2.3,1.9c-0.2,1.1,0.3,2.2,0.6,3.2c0.8,2.4,1.3,4.7-0.2,6.9c-1.1,1.7-3.2,3-3.9,5
        c-0.5,1.3,0.2,2.6,0.7,3.8c0.6,1.3,1,2.6,1,4.1c0.1,2.7-0.8,5.3-2.4,7.4c0.6-0.1,1.3,0.3,1.1,1c-1.4,3.7,3.9,6.1,5.8,8.4
        c1.1,1.4,1.5,2.9,2,4.6c0.4,1.6,1.1,3.2,2.9,3.6c1.5,0.3,3,0,4.5-0.4c1.9-0.5,3.8-1,5.7-1.4c3.5-0.6,7.1-0.8,10.4,0.6
        c1.4,0.6,2.8,1.4,3.9,2.5s1.8,2.4,2.5,3.8c0.6,1.3,1.3,2.8,2.6,3.6c1.4,0.8,3.1,0.6,4.6,0.3c1.7-0.3,3.3-0.8,5-0.8c1,0,2,0.2,3-0.2
        c0.6-0.3,1.2-0.8,1.6-1.3c1-1.2,1.7-2.7,2.6-4.1s2-2.8,3.3-3.9c2.4-2,5.9-3,8.8-1.5c1.5,0.8,2.2,2.2,3.5,3.1
        c0.6,0.4,2.4,0.8,2.4-0.4c0-0.8,1-1.2,1.5-0.6c2.9,3.2,5.9,6.4,8.8,9.6c1.7,1.8,3.4,3.7,4.6,5.9c0.4-0.1,0.9-0.1,1.5-0.2
        c1-0.1,2.1-0.3,3.1-0.7c2.6-1,4.1-2.8,3.6-5.7c-0.9-5.6,0.8-11.2,0.1-16.9c-0.2-1.4,0.3-3.1,0.8-4.5c1.2-3,1.7-6.2,2-9.3
        c0.3-4.6,0.6-8.7,5.5-11.4c2.5-1.4,2.9-4.6,1.8-7.4c-1.1-2.7-3.6-2.2-5.8-2c-2.1,0.3-4.4,0.5-6.3-0.5c-2.6-1.4-4.9-2.7-7.9-0.9
        c-1,0.6-2.4,0.2-3.4-0.4c-2.1-1.3-4.5-1.9-6.8-1.5c-4.9,0.8-6.6-1.9-7.6-5.8c-0.7-2.6-2.3-3.4-5-3.4c-3.2,0-6.4,0.7-9.5-0.4
        c-2.8-1-5.8-1.3-8.8-0.9c-1,0.1-2.2,0.6-2.9-0.6c-2.4-4.5-6.7-6.2-11.2-7.5c-2.7-0.8-3.7-2.4-3.8-5.1c-0.1-2.3-0.2-4.7-1.3-6.9
        c-0.3-0.7-0.4-1.9-1.4-1.7c-1,0.1-0.8,1.3-1,2.1c-0.5,2-0.3,4.5-2.6,5.5C283.4,39.4,281.9,39.6,280.6,39.3"
           />
          <text
            transform="matrix(1 0 0 1 292.3151 86.0555)"
            {...districtTextProps('Grand Est')}
          >
            GRAND EST
          </text>
        </g>
        <g className="fr-re">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps('La Réunion')}
            d="M45.4,153.2v0.1c-0.1,0.6-0.3,1.2-0.7,1.6
        c-0.2,0.2-0.1,0.4-0.2,0.6c0,0.4-0.1,0.9,0,1.3c-0.3,0.7,0.1,1.4-0.1,2.2c-0.2,0.3-0.3,0.6-0.7,0.7c-0.6,0.4-1.3,0.4-2,0.4
        c-0.5,0.1-1.1,0.1-1.6,0.2c-0.8,0.2-1.7,0.4-2.5-0.2c-0.1-0.1-0.3,0-0.5,0c-0.3,0-0.6,0.1-0.9-0.1c-0.7-0.5-1.6-0.5-2.4-0.9
        c-0.8-0.4-1.8-0.6-2.4-1.4c-0.3-0.5-0.9-0.6-1.5-0.6c-0.4,0-0.6-0.1-0.8-0.6c-0.1-0.4-0.5-0.7-0.8-1c-0.6-0.4-0.9-1-0.7-1.8
        c0.1-0.4-0.1-0.8-0.3-1.2c-0.4-0.9-1.1-1.5-1.7-2.3s-0.2-1.8,0.7-2.2c0.8-0.3,1.2-1.1,1-2c-0.1-0.3,0-0.5,0-0.8
        c0.1-0.4,0.3-0.6,0.8-0.4c0.5,0.2,1,0,1.3-0.4c0.6-0.6,1.2-1.1,2-1.4c0.4-0.1,0.9-0.1,1.4-0.1h0.1c0.3,0,0.5,0.3,0.7,0.4
        c0.2,0.1,0.4,0.1,0.6,0c0.6-0.2,1.1,0.1,1.6,0.3h0.3c0.2,0,0.5-0.2,0.7,0.1c0.1,0.1,0.3,0.1,0.4,0.1c0.6,0,1.2,0.3,1.8,0.6h0.1
        c0.1,0.1,0.3,0,0.3,0.2l0.8,0.7c0.9,0.5,0.8,1.3,0.8,2.1c0,0.1-0.1,0.3,0,0.4c0,0.2-0.1,0.4,0.1,0.5c0.1,0.1,0.3,0.1,0.4,0.3
        c0.4,0.3,0.5,0.7,0.5,1.1c0,0.3,0.2,0.4,0.4,0.5c0.3,0.1,0.3,0.4,0.4,0.5l0.1,0.1c0.3,0.1,0.3,0.4,0.4,0.6l0.1,0.1
        c0.3,0,0.7,0.1,0.8,0.4C45.5,152.3,45.6,152.5,45.4,153.2"
           />
          <text
            transform="matrix(1 0 0 1 57 156)"
            {...districtTextProps('La Réunion', true)}
          >
            LA RÉUNION
          </text>
        </g>

        <g className="fr-gp">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps('Guadeloupe')}
            d="M26.5,186.2v-0.9v-0.1c-0.5-1-0.2-2.3-1-3.2
        c0.1-0.6-0.2-1.1,0.2-1.7v-0.1c0-0.7,0.4-1.1,0.7-1.7c0-0.1,0.1-0.1,0.2-0.1c0.7-0.3,1.3-0.5,2,0c0.1,0.1,0.3,0.2,0.4,0.4
        c0.3,0.2,0.6,0.3,1,0.4c0.1,0,0.1,0.1,0.2,0.1c0.7-0.1,1.1,0.7,1.8,0.6c0.1,0,0.1,0,0.2,0.1c0.4,0.3,0.1,0.6-0.1,1
        c1-0.1,1.8-0.3,2.4-1.1c0.2-0.3,0-0.8,0.2-1.1c0.1-0.2,0.2-0.2,0.4-0.2c0.6-0.3,0.7-0.5,0.2-1.1c-0.2-0.1-0.5-0.2-0.6-0.5
        c-0.2-0.3,0-0.8-0.4-1.1c-0.3-0.5-0.1-0.8,0.3-1.1c0.2-0.4,0.5-0.7,0.8-0.9l0.2-0.1c0-0.1,0.1-0.1,0.1-0.2c0.4-0.2,0.6-0.7,1.1-0.5
        c0.3,0.2,0.6,0.3,0.8,0.5c0.1,0.1,0.2,0.1,0.2,0.2c0.2,0.2,0.5,0.3,0.7,0.5c0.1,0.2,0.3,0.4,0.3,0.6c0.1,0.5,0.3,1,0.2,1.5v0.2
        c-0.3,0.9,0.4,1.4,0.9,1.9c0.1,0,0.1,0.1,0.2,0.1c0.8,0.3,1.7,0.2,2.5,0.5c0.1,0,0.2,0.1,0.3,0.2c0.2,0.2,0.2,0.6,0.6,0.6
        c0.1,0,0.2,0.1,0.2,0.2c0.3,0.8,1,1.1,1.7,1.4c0,0.1,0,0.2-0.1,0.3s-0.3,0.1-0.5,0.1h-0.2c-0.7-0.2-1.4,0-2.1,0.2
        c-0.1,0-0.1,0-0.2,0.1c-0.4,0.1-0.8,0-1.2,0H41c-0.2-0.1-0.3,0.1-0.5,0.2c-0.2,0.2-0.5,0.2-0.7,0.4c-0.1,0.1-0.2,0.1-0.3,0.2
        c-0.2,0.1-0.4,0.1-0.6,0.2c-0.7,0.3-1.4,0.2-2,0.5h-0.4c-0.9-0.2-1.9-0.2-2.3-1.2c0,0,0-0.1-0.1-0.1v0.1c0,0.2-0.1,0.3-0.3,0.3h-0.2
        c-0.2-0.1-0.3-0.2-0.6-0.1l-0.1,0.1c-0.1,0.3,0,0.6-0.2,0.8v0.2c0.2,0.2,0.2,0.5,0.3,0.7c0,0.1,0.1,0.2,0.1,0.3
        c0.4,0.8,0.6,1.7,0.8,2.6c0,0.7,0.1,1.3-0.3,1.9c-0.1,0.2-0.3,0.3-0.5,0.4v0.1l-1.2,1.2l-0.3,0.3c-0.2,0.1-0.5,0.1-0.7,0.2
        c-0.2,0.1-0.3,0.1-0.5,0.2l-0.3,0.1c-0.3,0.4-0.8,0.4-1.2,0.3c-0.1,0-0.1-0.1-0.1-0.2c-0.1-0.5-0.3-0.9-0.7-1.2
        c-0.4-0.3-0.7-0.7-0.7-1.1c0-0.1,0-0.1-0.1-0.2c-0.1-0.2-0.2-0.5-0.3-0.7c-0.2-0.2-0.1-0.5-0.1-0.8c0.2-0.5-0.2-0.8-0.3-1.1
        C26.3,186.6,26.3,186.4,26.5,186.2"
           />
          <text
            transform="matrix(1 0 0 1 57 187)"
            {...districtTextProps('Guadeloupe', true)}
          >
            GUADELOUPE
          </text>
        </g>

        <g className="fr-mq">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps('Martinique')}
            d="M39.4,211.8c0.7-1.5,2.4-1.1,3.3-2c0.2-0.2,0.7,0,0.8,0.4
        c0.1,0.5-0.3,0.3-0.6,0.3c-0.4-0.1-0.2,0.3-0.2,0.4c-0.1,1-0.3,1.1-1.1,0.5c-0.4-0.2-0.9-0.6-1.1,0c-0.2,0.4-0.4,0.8,0.2,1.3
        c0.4,0.3,1,0,1.2,0.7c0.1,0.4,0.2,0.5-0.2,0.7c-0.3,0.1-0.5,0.3-0.8,0.5c-0.4,0.2-0.6,0.4-0.3,0.9c0.3,0.3,0.5,0.6,0.9,0.2
        c0.4-0.4,1,0.1,1.6-0.3c-0.1,0.3,0,0.4-0.1,0.5c-0.9,0.3-0.3,0.9-0.4,1.4c0,0.2,0.1,0.3,0.2,0.3c0.7,0,0.7,0.7,1,1
        c0.6,0.5,1,1,1.3,1.7c0,0.1,0.3,0.1,0.6,0.1c-0.2,0.4-0.2,0.7,0.1,1.1c0.2,0.2,0.3,0.6,0,1.1c-0.1,0.3,0.3,0.9,0.5,1.3
        s0.5,0.5,0.1,1c-0.2,0.3,0,0.9-0.3,1.4c-0.2,0.4-0.3,0.8-0.8,1c-0.1,0-0.2,0.1-0.2,0.2c-0.1,0.6-0.5,1.2-1,1.2
        c-0.6,0-0.9-0.4-1.1-0.9c-0.1-0.1-0.1-0.3-0.1-0.4c0.5-0.4,0.1-1.3,0.8-1.6c0.2-0.1,0.5-0.4,0.2-0.7s-0.5,0-0.7,0.2
        c-0.5,0.4-1,1.2-1.4-0.1c-0.1-0.3-0.4-0.1-0.6-0.1c-1,0.4-1.8,0.1-2.7-0.5c-0.1,0-0.1-0.2-0.2-0.1c-0.6,0.6-1.2,0.1-1.8,0
        c-0.5-0.1-1,0.2-1.2,0.7c-0.3,0.5-0.5,0.5-1,0.1c-0.6-0.5-0.8-1.1-0.9-1.7c-0.1-0.4-0.7-0.5-0.5-0.9c0.2-0.6,0.5-1.1,1.1-1.3
        c0.1,0,0.3,0,0.4-0.1c0.5-0.7,0.9-0.8,1.5,0.1c0.2,0.3,1.1,0.4,1.6-0.1c0.3-0.3,0.4-0.5-0.1-0.8s-0.9-0.9-0.8-1.6
        c0-0.3,0.1-0.6-0.2-0.7c-0.3-0.1-0.6,0.1-0.7,0.4c-0.1,0.4-0.5,0.3-0.8,0.3c-0.3-0.1-0.6-0.2-0.9-0.1c-0.6,0.1-1.1-0.1-1.4-0.7
        c-0.2-0.4-0.6-0.6-1-0.7c-1.6-0.8-2.3-2.4-3-3.9v-0.4c0.8-1.4-0.4-2.3-1.2-3c-1.3-1.2-1.4-3,0-4.1c1.5-1.1,3.6-1.1,5.2,0
        c0.8,0.5,1.5,1.2,2.6,1.3c0.3,0,0.6,0.3,0.9,0.6C37.4,208.9,38.7,210,39.4,211.8"
           />
          <text
            transform="matrix(1 0 0 1 57 221)"
            {...districtTextProps('Martinique', true)}
          >
            MARTINIQUE
          </text>
        </g>

        <g className="fr-gf">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps('Guyane Française')}
            d="M26.5,248c-0.2-0.4-0.2-0.8,0-1.3c0.2-1.3,1-2.2,2-2.9
        c0.7-0.5,1-1.1,1.1-1.9c0-0.4,0.1-0.7,0.5-0.9c0.3-0.2,0.6-0.1,0.9,0c1,0.6,2,1.3,3.2,1.4c0.1,0.1,0.2,0,0.3,0
        c0.6,0.2,1.2,0.5,1.8,0.5c0.5,0,0.9,0.2,1.1,0.6c0.6,0.9,1.6,1.5,2.4,2.2c0.2,0.2,0.4,0.3,0.6,0.5c0.2,0.2,0.2,0.6,0.6,0.2l0.2,0.1
        c0,0.5,0.6,0.4,0.7,0.7c0.2,0.4,0.6,0.5,0.9,0.8c0.4,0.4,0.3,0.9,0.6,1.3c0.1,0.1,0.1,0.2,0.1,0.3c0-0.1,0.1,0,0,0s0,0.1,0,0
        s0,0.1,0,0s-0.1-0.3,0-0.4c0.1-0.2,0-0.5,0.1-0.7c0.3-0.4,0.6-0.4,0.9,0.1c0.2,0.3,0.3,0.7,0.4,1.1c0.2,0.5,0.1,1.1,0.5,1.5v0.8
        c0,0.1,0,0.3-0.1,0.4c-0.9,0.5-1.2,1.6-2,2.3c-0.4,0.4-0.5,1-0.8,1.5c-0.3,0.4-0.5,0.9-0.8,1.4c-0.1,0.1-0.2,0.2-0.4,0.3
        c-0.4,0.3-0.7,0.5-0.7,1.1c0,0.5-0.3,0.9-0.5,1.4c-0.3,0.5-0.7,1.2-0.8,1.7c-0.1,0.6-0.4,1-0.7,1.4c-0.2,0.3-0.4,0.4-0.7,0.6
        c-0.4,0.2-0.8,0.4-1.1,0.8c-0.2,0.3-0.7,0.3-1,0.1c-0.3-0.1-0.5-0.2-0.8-0.1c-0.1-0.1-0.3,0.1-0.5-0.1c0-0.4-0.4-0.5-0.6-0.7
        c-0.1-0.1-0.2,0.1-0.3,0.2c-0.7,0.7-1.9,0.4-2.5-0.2c-0.2-0.2-0.3-0.1-0.4,0c-0.6,0.3-1,1.1-1.8,1.1c-0.1,0-0.1,0.2-0.2,0.3
        c-0.1,0.1-0.2,0.2-0.3,0.2c-0.7-0.3-1.6-0.4-2.3-0.7c-0.4-0.1-0.4-0.7-0.8-0.8c0.3-0.1,0.6,0,0.7-0.4c0-0.1,0.1-0.2,0.1-0.2
        c0.7-0.1,0.9-0.8,1.1-1.3c0.1-0.3,0.3-0.6,0.5-0.9c0.6-0.8,0.5-1.7,0.4-2.5c-0.1-0.3,0-0.5,0.1-0.7c0.2-0.4,0.5-0.7,0.8-1
        c0.3-0.5,0.3-1,0.4-1.5v-0.3c-0.8-0.8-1.6-1.6-2.2-2.6c0-0.1-0.2-0.2-0.2-0.2c0.2-0.5-0.2-0.9-0.4-1.2v-0.6c0-0.3-0.3-0.6-0.2-0.9
        c0.1-0.2,0-0.4,0-0.6C26.8,249,26.7,248.5,26.5,248z"
           />
          <text
            transform="matrix(1 0 0 1 57 257)"
            {...districtTextProps('Guyane Française', true)}
          >
            GUYANE FRANÇAISE
          </text>
        </g>

        <g className="fr-yt">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            cursor="pointer"
            {...regionPathProps('Mayotte')}
            d="M40.6,305.8c-0.5,0.7-0.5,0.7-1.2,0.6c-0.3-0.1-0.5-0.1-0.8-0.2
        c-1.1-0.2-1.1-0.2-1.6,0.7c-0.1,0.3-0.2,0.6-0.5,0.8l-5.4-3.4c0.4-0.6,0.7-1.2,1-1.7c0.2-0.3,0.4-0.4,0.7-0.4h2.1
        c0.4,0,0.6-0.1,0.8-0.5c1-1.6,1-1.6-0.2-3c-0.9-1.1-1.7-2.1-2.6-3.2c-0.2-0.3-0.4-0.6-0.4-1c-0.1-1.7-0.3-3.3-0.5-5
        c-0.1-0.8-0.2-1.6-0.2-2.4c0-0.5-0.2-0.8-0.6-1.1c-1.1-0.8-2.2-1.7-3.3-2.5c-0.4-0.3-0.5-0.6-0.5-1.1c0-1.7,0-1.7,1.3-2.8
        c0.6-0.5,1.3-1,1.9-1.5c0.4-0.3,0.6-0.2,0.9,0.1c1.1,1.5,2.3,2.9,3.4,4.4c0.4,0.6,0.9,0.8,1.6,0.7c1-0.1,2.1-0.1,3.1-0.2
        c0.3,0,0.5,0,0.8,0.1c1.1,0.5,2.2,0.9,3.3,1.4c0.4,0.2,0.5,0.4,0.5,0.8c0.1,2.1,0.1,2.1-1.5,3.5c-0.8,0.8-1.7,1.5-2.5,2.3
        c-0.6,0.5-0.6,0.6-0.2,1.3c0.1,0.2,0.2,0.4,0.4,0.6c1.4,2.4,1.4,2.4,1.3,5.2c0,0.4-0.2,0.7-0.4,1l-2.7,3.9c-0.6,0.8-0.5,1,0.4,1.5
        C39.7,305.3,40.2,305.5,40.6,305.8"
           />
          <text
            transform="matrix(1 0 0 1 57 297)"
            {...districtTextProps('Mayotte', true)}
          >
            MAYOTTE
          </text>
        </g>
      </svg>
    </div>
  )
}
