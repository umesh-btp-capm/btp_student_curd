using btp.u as be from '../db/data-model';


service StudentTotalInfo {

    entity StudentTotalInfo as select from be.STUDENT_INFO;

    entity OutputData as select from be.OUTPUT_DATA;
}