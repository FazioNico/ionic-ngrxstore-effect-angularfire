/**
* @Author: Nicolas Fazio <webmaster-fazio>
* @Date:   15-03-2017
* @Email:  contact@nicolasfazio.ch
* @Last modified by:   webmaster-fazio
* @Last modified time: 15-03-2017
*/

export interface UserI {
    isAuth: boolean;
    displayName: string | null;
    email: string | null;
    uid: number | null;
}
