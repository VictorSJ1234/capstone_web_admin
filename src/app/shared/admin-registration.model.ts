export class AdminRegistration {
    _id: string = '';
    firstname: string = '';
    lastname: string = '';
    gender: string = '';
    username: string = '';
    email: string = '';
    contact_number: string = '';
    password: string = '';
    role: string = '';
    adminProfilePicture: string = '';
}

export class UserInformation {
    _id: string = '';
    name: string = '';
    birthday: string = '';
    gender: string = '';
    contact_number: string = '';
    barangay: string = '';
    email: string = '';
    profilePicture: string = '';
}

export class AdminResponse {
    _id: string = '';
    reportVersion: string = '';
    reportId: string = '';
    userId: string = '';
    report_status: string = '';
    action_to_do: string = '';
    response_description: string = '';
    date_responded: string = '';
}