import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StatusBar,
    Image,
    StyleSheet,
    Button,
    Alert
} from 'react-native'
import {
    GoogleSigninButton,
    GoogleSignin,
    statusCodes
} from '@react-native-community/google-signin'
import { WEB_CLIENT_ID } from '../../utils/keys'
import { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

export default function GoogleLogin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        configureGoogleSign()
    }, [])

    configureGoogleSign = () => {
        GoogleSignin.configure({
            webClientId: WEB_CLIENT_ID,
            offlineAccess: false
        })
    }



    signIn = () => {
        return new Promise(async (resolve, reject) => {
            console.log("SignIn start")
            try {
                await GoogleSignin.hasPlayServices()
                const userInfo = await GoogleSignin.signIn()
                const { accessToken, idToken } = await GoogleSignin.signIn()
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    idToken,
                    accessToken
                )
                setUserInfo(userInfo)
                setError(null)
                setIsLoggedIn(true)
                let userCre = await firebase.auth().signInWithCredential(credential)
                console.log("signIn", userCre)
                resolve(userCre)

            } catch (error) {
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    // when user cancels sign in process,
                    Alert.alert('Process Cancelled')
                } else if (error.code === statusCodes.IN_PROGRESS) {
                    // when in progress already
                    Alert.alert('Process in progress')
                } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                    // when play services not available
                    Alert.alert('Play services are not available')
                } else {
                    // some other error
                    Alert.alert('Something else went wrong... ', error.toString())
                    setError(error)
                    reject(null)
                }
            }

        })

    }


    // signIn = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices()
    //         const userInfo = await GoogleSignin.signIn()
    //         const { accessToken, idToken } = await GoogleSignin.signIn()
    //         const credential = firebase.auth.GoogleAuthProvider.credential(
    //             idToken,
    //             accessToken
    //         )
    //         setUserInfo(userInfo)
    //         setError(null)
    //         setIsLoggedIn(true)
    //         await firebase.auth().signInWithCredential(credential)


    //     } catch (error) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             // when user cancels sign in process,
    //             Alert.alert('Process Cancelled')
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             // when in progress already
    //             Alert.alert('Process in progress')
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             // when play services not available
    //             Alert.alert('Play services are not available')
    //         } else {
    //             // some other error
    //             Alert.alert('Something else went wrong... ', error.toString())
    //             setError(error)
    //         }
    //     }
    // }


    getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently()
            setUserInfo(userInfo)
            const user = firebase.auth().currentUser;
            if (user) {
                return firestore().collection('Users').doc(user).set(user);
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                // when user hasn't signed in yet
                Alert.alert('Please Sign in')
                setIsLoggedIn(false)
            } else {
                Alert.alert('Something else went wrong... ', error.toString())
                setIsLoggedIn(false)
            }
        }
    }

    startHire = async () => {
        //if (signIn()) {
        //this is used to store data into firestore
        console.log("starthire", user)
        const user = await signIn()
        if (user) {
            // const dataUser = firebase.auth().currentUser;
            // if (dataUser) {
            //     return firestore().collection('Users').doc(user).set(user);
            // }
            Alert.alert('Lets Go')
            this.props.navigation.navigate('hire')


        } else {
            Alert.alert('Something Wrong')
        }


    }

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess()
            await GoogleSignin.signOut()
            setIsLoggedIn(false)
        } catch (error) {
            Alert.alert('Something else went wrong... ', error.toString())
        }
    }

    return (
        <>
            <StatusBar barStyle='dark-content' />
            <View style={styles.container}>
                <GoogleSigninButton
                    style={styles.signInButton}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => startHire()}
                />
                <View style={styles.statusContainer}>
                    {isLoggedIn === false ? (
                        <Text style={styles.message}>You must sign in!</Text>
                    ) : (
                            <Button onPress={() => signOut()} title='Sign out' color='#332211' />
                        )}
                </View>
                <View style={styles.userInfoContainer}>
                    {isLoggedIn === true ? (
                        <>
                            <Text style={styles.displayTitle}>
                                Welcome {userInfo.user.name}
                            </Text>
                            <View style={styles.profileImageContainer}>
                                <Image
                                    style={styles.profileImage}
                                    source={{
                                        uri: userInfo && userInfo.user && userInfo.user.photo
                                    }}
                                />
                            </View>
                        </>
                    ) : null}
                </View>
            </View>
        </>
    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signInButton: {
        width: 192,
        height: 48
    },
    statusContainer: {
        marginVertical: 20
    },
    message: {
        fontSize: 20,
        color: 'red'
    },
    userInfoContainer: {
        marginVertical: 20
    },
    profileImageContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    profileImage: {
        width: 100,
        height: 100
    },
    displayTitle: {
        fontSize: 22,
        color: '#010101'
    }

})



