import {
    cities_within_lat_lng, city_id
} from './validators/rules';

type MetadataObj = {[key: string]: unknown}

const getValidator = (validationName:string) => {
    const rules: MetadataObj = {
        cities_within_lat_lng, city_id
    };
    return rules[validationName]
}

export default getValidator;