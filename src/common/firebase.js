const admin = require("firebase-admin");

// const serviceAccount = require("../config/firebaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "doantotnghiep-39d62", // I get no error here
    clientEmail: "firebase-adminsdk-h00pa@doantotnghiep-39d62.iam.gserviceaccount.com", // I get no error here
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2sdN0uSS/JCKU\nqnC+QiZACJkxiGFfdR/xisKxPSOKQg4eEFfT1HZk7stkAkj/nl5wZXFZqGysbVOX\nqgbXM+B7quonKfD1eRS99KOY1WELKXisp3fljRY4ADtoYLWz6oMRcpNGglMkN42M\nrmfCrJIRXVjy7Q9H9vOUELVrXsQ0M2TGxKtSyvnJL9n1iMDhbPx40c8BrmId1fJV\nfjSbFfdHgjIx3uMoVcNKvUzAzO8koqM1EPLF9a5F4wdSPCJ9SGTSAzQbUWq7wsNG\n395WljzM770AAB+KJVvPY3diMf7XFMWnGqEbebv2QK6uM1qMdKxju08Dq4EO2zCK\nm6Tje4CbAgMBAAECggEAAYS+5DKG0dtJbODmH/filugMQzzthGD1kQWPRVJTeWq/\nvX29s/s3tBe0k/nIfJ8TDMVoCDKvbxqiEyQqgAIY6nBFIOfl7kvS0BqW1J2uJ9gB\nOr+KAPV/hRlMMeonSjuq19RYyBwd129ARB8ht/d/HWP2V2RSFAXhhdwv6Xy/09t9\nU05aYYZJ+4DwRe7tU9UBKvwt/YpATxDD8Vs29/xtu1AHJxDmuVRV1Wk2loyyLlEa\nvEwZtyC/vZQ2eGwt+9csA417qjL4wPVfYi0LYntrkITzePgI2sWzelxV4jFcNlN4\nxYbUyr++DfxEx2MAocExYoUNmdKg/bvqD5toQ+TKAQKBgQD5E/O+yyzt4orfmNSf\njSRlz2LOTzMUVYC+0o4KhlXMwY3j1HlGz79nruBeSTCEO5naKKFJPhGgVnQAV2iH\n0fkR/IoYnKraeih0np7j8iDx8Q3DBvZyWVsFAlgRXUgkGV+SvKm7mjklsgMXV1BW\nIgrbrGpCo9tqWObdAZocvwxWmwKBgQC7xZgrGo0kWs+eJ1WEcbrvuhccogxHNmP/\nHUtuHe/0x6E/bFZifTLcV1W0kuN1xMlZ9JNbBuWvJmA+SPtTMVxsKDHTFEdu5H9F\nATLGLUIEDGib1hdkcoPJ2JpxpvQqWDW/vWNr5RV4JHK0OVXoVBMf734BKHOKQVby\nKwwttuseAQKBgQCACJmKwbXeskzgkxb4zPyguPH5SwzervT3IhSRpGwGTJg7PMT6\neV/SVDpRPR4LWvfDBI+jrpww5z/JzSSWbICzljUGYcIRfCm/iKn0UkpNE7QXRET6\nkqQO9x1+D409wS03qHM3VBd8IP0lymQpYmZidUZJ6yCmkfxaLrChhjM5cQKBgHjS\nijmiGhO8gz+m27YfYEQFH/4Cn5fq/akYdoLirJZ7Jdyjn2o8WU/Cupk4szgCafWC\nFJdL9tse/GrXlzBO4MOPkY/ayqQmT2ZdgQhX8tScD2vG9MJjlT16LNbYsN/WZq97\n889nVss52Lzy775Q6wVvm0qvdrkNlh65aFq6CswBAoGAXmphyRWan5VffbEEhI0O\nHYeNcRb4EGmNnAxlfZg7sKBo9m06Wns0MrsCUjlGuy0H4PPzYhmm0emQGQUNjUTR\nUFt+1erF9ZArLqVDkuvgtzup3UFtDqmPgaZRH5V4G/IvLrg4Q2YvfiqTQjQi4o68\nCCwuQFwaY61s1Pz+csKmmRk=\n-----END PRIVATE KEY-----\n"
  }),
});

module.exports = admin;