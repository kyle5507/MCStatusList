import { getStatus } from '@utils/packages'

export const getMcStatus = async (ip: string) => {
    try {
        var status = await getStatus(ip);
    } catch {
        return JSON.parse('{"online": false}');
    }
    return status;
}