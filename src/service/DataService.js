import { Toast } from 'native-base';
import { db } from '../config/firebase';


export const addJob = (jobname, uniqueId, jobdesc, worktype, salary, peoplenum, chosenDate, location) => {
    db.ref('/Job').push({

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