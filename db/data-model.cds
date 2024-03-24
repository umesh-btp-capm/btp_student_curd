namespace btp.u;

entity STUDENT_INFO {
    key ID: String(50);
    NAME: String(255);
    AGE: Integer;
    BRANCH:String(255);
    TOTAL_SUB:Integer;
    M1_M:Integer;
    PYTHON_M:Integer;
    CS_M:Integer;
    MACHINES_M:Integer;
    DRAWING_M:Integer;
    EHV_M:Integer
    
}

@cds.persistence.skip
entity OUTPUT_DATA {
    key ID: String(50);
    NAME: String(255);
    AGE: Integer;
    BRANCH:String(255);
    TOTAL_SUB:Integer;
    M1_M:Integer;
    PYTHON_M:Integer;
    CS_M:Integer;
    MACHINES_M:Integer;
    DRAWING_M:Integer;
    EHV_M:Integer
}


