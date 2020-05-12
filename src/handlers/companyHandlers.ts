function handleGetTotalCompanies(req: any, res: any) {
	//
}

function handleCompanyAdd(req: any, res: any) {
	const newCompany = req.body;

	const company = {};

	res.status(201);
	res.send(company);
}

function handleCompanyDelete(req: any, res: any) {
	//
}

function handleCompanyEdit(req: any, res: any) {
	//
}

export { handleGetTotalCompanies, handleCompanyAdd, handleCompanyDelete, handleCompanyEdit };
