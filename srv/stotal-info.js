const cds = require('@sap/cds');

module.exports = cds.service.impl(srv => {

    const { STUDENT_INFO } = cds.entities('btp.u');

    //Post Method
    srv.on('CREATE', 'OutputData', async (req) => {
        const { NAME, AGE, BRANCH, TOTAL_SUB, M1_M, PYTHON_M, CS_M, MACHINES_M, DRAWING_M, EHV_M } = req.data

        try {
            ValidateInput(NAME, AGE, BRANCH, TOTAL_SUB, M1_M, PYTHON_M, CS_M, MACHINES_M, DRAWING_M, EHV_M);

            const tx = cds.transaction(req);

            const id = GenerateCustomId(200);

            const createStudentTotalInfo = await tx.run(
                INSERT.into(STUDENT_INFO)
                    .columns('ID', 'NAME', 'AGE', 'BRANCH', 'TOTAL_SUB', 'M1_M', 'PYTHON_M', 'CS_M', 'MACHINES_M', 'DRAWING_M', 'EHV_M')
                    .values(id, NAME, AGE, BRANCH, TOTAL_SUB, M1_M, PYTHON_M, CS_M, MACHINES_M, DRAWING_M, EHV_M)
            )

            return createStudentTotalInfo
        } catch (error) {
            console.error('Error creating student:', error);

            return {
                error: 'Failed to create studentInfo. Please check your input or try again later.'
            };
        }
    })

    //Validating input 
    const ValidateInput = (NAME, AGE, BRANCH, TOTAL_SUB, M1_M, PYTHON_M, CS_M, MACHINES_M, DRAWING_M, EHV_M) => {

        if (!NAME || !AGE || typeof AGE !== 'number' || AGE <= 0 || !BRANCH || !TOTAL_SUB || typeof TOTAL_SUB !== 'number' || !M1_M || typeof M1_M !== 'number' || !PYTHON_M || typeof PYTHON_M !== 'number' || !CS_M || typeof CS_M !== 'number' || !MACHINES_M || typeof MACHINES_M !== 'number' || !DRAWING_M || typeof DRAWING_M !== 'number' || !EHV_M || typeof EHV_M !== 'number') {
            throw new Error('Invalid input data. Please provide a valid name and age .');
        }

    }


    const GenerateCustomId = (prefix) => {
        const uuid = require('uuid');

        return `${prefix}${uuid.v4()}`;
    }


   
    // Update Method
    srv.on('UPDATE', 'OutputData', async (req) => {
        const { ID, NAME, AGE, BRANCH, TOTAL_SUB, M1_M, PYTHON_M, CS_M, MACHINES_M, DRAWING_M, EHV_M } = req.data;

        try {
    
            const tx = cds.transaction(req);

            // Fetch the existing values from the database
            const existingValues = await tx.run(SELECT.from(STUDENT_INFO).where({ ID }));

            if (existingValues.length === 0) {
                return { error: `Student with ID ${ID} not found.` };
            }

            const updateStudentTotalInfo = await tx.run(
                UPDATE(STUDENT_INFO)
                    .set({
                        NAME: NAME || existingValues[0].NAME, // Update NAME if provided, otherwise keep existing value
                        AGE: AGE || existingValues[0].AGE,
                        BRANCH: BRANCH || existingValues[0].BRANCH,
                        TOTAL_SUB: TOTAL_SUB || existingValues[0].TOTAL_SUB,
                        M1_M: M1_M || existingValues[0].M1_M,
                        PYTHON_M: PYTHON_M || existingValues[0].PYTHON_M,
                        CS_M: CS_M || existingValues[0].CS_M,
                        MACHINES_M: MACHINES_M || existingValues[0].MACHINES_M,
                        DRAWING_M: DRAWING_M || existingValues[0].DRAWING_M,
                        EHV_M: EHV_M || existingValues[0].EHV_M
                    })
                    .where({ ID })
            );

            return updateStudentTotalInfo;
        } catch (error) {
            console.error('Error updating student:', error);

            return {
                error: 'Failed to update studentInfo. Please check your input or try again later.'
            };
        }
    });




    //Get Method
    srv.on('READ', 'OutputData', async (req) => {

        const tx = cds.transaction(req)

        const getAllData = await tx.run(
            SELECT.from(STUDENT_INFO)
        )

        const aJSONOutput = []
        getAllData.forEach(item => {
            aJSONOutput.push({
                "ID": item.ID,
                "NAME": item.NAME,
                "AGE": item.AGE,
                "BRANCH": item.BRANCH,
                "TOTAL_SUB": item.TOTAL_SUB,
                "M1_M": item.M1_M,
                "PYTHON_M": item.PYTHON_M,
                "CS_M": item.CS_M,
                "MACHINES_M": item.MACHINES_M,
                "DRAWING_M": item.DRAWING_M,
                "EHV_M": item.EHV_M
            })
        })

        return aJSONOutput
    })


    srv.on('DELETE','OutputData',async(req) =>{

        const {ID} = req.data

        const tx=cds.transaction(req)

        const deleteStudent=await tx.run(
            DELETE.from(STUDENT_INFO)
                .where({ID})
        )
        return deleteStudent
    })
})