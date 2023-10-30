export class AdminRegistration {
    _id: string = '';
    fullname: string = '';
    gender: string = '';
    birthday: string = '';
    contact_number: string = '';
    office: string = '';
    selected_role: string = '';
    email: string = '';
    uploaded_file: string[] = [];
    password: string = '';
    adminProfilePicture: string = '';
    official_role: string = '';
    postedDate: string = '';
}


export class UserInformation {
    _id: string = '';
    name: string = '';
    birthday: string = '';
    gender: string = '';
    contact_number: string = '';
    street_name: string = '';
    house_number: string = '';
    floor: string = '';
    building_name: string = '';
    barangay: string = '';
    district: string = '';
    city: string = '';
    uploaded_file: string = '';
    email: string = '';
    password: string = '';
    profilePicture: string = '';
    postedDate: string = '';
    accountStatus: string = '';
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
    uploaded_file: string[] = [];
}

export class CommunityProjects {
    _id: string = '';
    project_title: string = '';
    project_date: string = '';
    project_time: string = '';
    uploaded_file: string = '';
    project_type: string = '';
    location: string = '';
    details: string = '';
    date_created: string = '';
}

export class userReportStatus {
    report_status: string = '';
}

export class ReportToBarangay {
    _id: string = '';
    reportId: string = '';
    report_number: string = '';
    barangay: string = '';
    status: string = '';
    report_subject: string = '';
    uploaded_file: string[] = [];
    details: string = '';
    date_created: string = '';
}


export class denguePost {
    _id: string = '';
    project_title: string = '';
    project_date: string = '';
    project_time: string = '';
    uploaded_file: string = '';
    details: string = '';
    date_created: string = '';
}


export class BarangayResponse {
    _id: string = '';
    responseVersion: string = '';
    reportId: string = '';
    userId: string = '';
    sender: string = '';
    recipient: string = '';
    report_status: string = '';
    action_to_do: string = '';
    response_description: string = '';
    date_responded: string = '';
    uploaded_file: string[] = [];
}

export class AdminResponseToBarangay {
    _id: string = '';
    responseVersion: string = '';
    reportId: string = '';
    userId: string = '';
    sender: string = '';
    recipient: string = '';
    status: string = '';
    action_to_do: string = '';
    response_description: string = '';
    date_responded: string = '';
    uploaded_file: string[] = [];
}

export class inquiry {
    _id: string = '';
    email: string = '';
    response_subject: string = '';
    uploaded_file: string[] = [];
    inquiry_response: string = '';
}

export class notification{
    _id: string = '';
    projectId: string = '';
    userId: string = '';
    reportId: string = '';
    title: string = '';
    message: string = '';
    notificationStatus: string = '';
}

export class adminNotification{
    _id: string = '';
    projectId: string = '';
    userId: string = '';
    adminId: string = '';
    recipient: string = '';
    reportId: string = '';
    title: string = '';
    message: string = '';
    notificationStatus: string = '';
}
