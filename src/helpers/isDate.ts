import moment from 'moment';


interface Options {
    req: any;
    location: string;
    path: string;
}

export const isDate = (value: any, opts: Options) => {
    if (!value) {
        return false;
    }
    const fecha = moment(value);
    if (fecha.isValid()) {
        return true;
    } else {
        return false;
    }
};