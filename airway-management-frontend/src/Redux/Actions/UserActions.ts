import store from '../store';
const dispatch = store.dispatch;

export const onLoginSuccess = (res: any) => {
    console.log('login success : ', res.profileObj);
    dispatch({ type: 'LOGIN', payload: { email: res.profileObj.email } });

}
export const onFailureSuccess = (res: any) => {
    console.log("login failed :", res);
}
export const onSignoutSuccess = () => {
    alert('You have been signed out successfully!');
    dispatch({ type: 'USERLOGOUT' });
    dispatch({ type: 'LOGIN', payload: { email: '' } });
}



