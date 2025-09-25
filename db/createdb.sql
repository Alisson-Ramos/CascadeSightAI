DROP TABLE report;
CREATE TABLE report (
    id UUID PRIMARY KEY
);
DROP TABLE report_info;
CREATE TABLE report_info (
    id SERIAL         PRIMARY KEY,
    report_id UUID    REFERENCES report(id) ON DELETE CASCADE,
    description TEXT  NOT NULL,
    ts_eta TIMESTAMP  NULL
);
