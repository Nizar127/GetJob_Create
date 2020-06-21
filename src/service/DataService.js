import { Toast } from 'native-base';
import { db } from '../config/firebase';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

//const applicantRef = firestore().collection('Application');

export function addApplicant(job, addComplete) {
    firestore()
        .collection('Application')
        .add({
            jobname: job.jobname,
            uniqueId: job.uniqueId,
            jobdesc: job.jobdesc,
            worktype: job.worktype,
            salary: job.salary,
            peoplenum: job.peoplenum,
            chosenDate: job.chosenDate,
            location: job.location,
            createdAt: firestore.FieldValue.serverTimestamp()
        }).then((data) => addComplete(data))
        .catch((error) => console.log(error));
}

// export const addApplicant = () => {
//     applicantRef.add({
//         jobname: jobname,
//         uniqueId: uniqueId,
//         jobdesc: jobdesc,
//         worktype: worktype,
//         salary: salary,
//         peoplenum: peoplenum,
//         chosenDate: chosenDate,
//         location: location
//     })
// }

export const addJob = (jobname, uniqueId, jobdesc, worktype, salary, peoplenum, chosenDate, location) => {
    db.ref('/Job').child(uniqueId).set({

        jobname: jobname,
        uniqueId: uniqueId,
        jobdesc: jobdesc,
        worktype: worktype,
        salary: salary,
        peoplenum: peoplenum,
        chosenDate: chosenDate,
        location: location
    })
}

export const removeJob = (uniqueId) => {
    db.ref('/Job').child(uniqueId).remove();

}

// export const addingJob = (jobname, uniqueId, jobdesc, worktype, salary, peoplenum, chosenDate, location) => {
//     firestore.collection('Job').set({
//         jobname: jobname,
//         uniqueId: uniqueId,
//         jobdesc: jobdesc,
//         worktype: worktype,
//         salary: salary,
//         peoplenum: peoplenum,
//         chosenDate: chosenDate,
//         location: location
//     })
// }

// export const updateStudent =  (name, matricno, major, year, status) => {
//     db.ref('/students').child(matricno).update({
//         name: name,
//         matricno: matricno,
//         major: major,
//         year: year,
//         status: status
//     }, () => Actions.HomeScreen());
// }

// export const removeStudent =  (matricno) => {
//     db.ref('/students').child(matricno).remove();
//     Actions.HomeScreen();
// }