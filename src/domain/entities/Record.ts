export class Record {
    id: number;
    name: string;
    donationRecord: number = 0;
    personelRecord: number = 0;
    studentRecord: number = 0;
    constructor(
        id: number,
        name: string,
        donationRecord: number,
        personelRecord: number,
        studentRecord: number,
    ) {
        this.id = id
        this.name = name
        this.donationRecord = donationRecord
        this.personelRecord = personelRecord
        this.studentRecord = studentRecord
    }
}