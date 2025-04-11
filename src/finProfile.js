const FinanceProfile = {
    "id": "2a56a1d5-9e2d-487f-b93e-9e31a2a47db5",
    "monthly_income": 85000,
    "average_expenditure_per_month": 50000,
    "gold_loans": ["Bank of India - ₹1,50,000 @ 7.5%", "Manappuram Finance - ₹75,000 @ 8.2%"],
    "otherDebts": [
        {
            "type": "Credit Card",
            "amount": 35000,
            "interestRate": 36.0
        },
        {
            "type": "Personal Loan",
            "amount": 100000,
            "interestRate": 13.5
        }
    ],
    "user_id": "cc0ab64f-1f41-4fa5-b94e-61c6d91e8613",
    "loan": [
        {
            "type": "Home Loan",
            "principal": 2500000,
            "interestRate": 7.2,
            "tenure": 240
        },
        {
            "type": "Car Loan",
            "principal": 600000,
            "interestRate": 9.0,
            "tenure": 60
        }
    ],
    "emi": [
        {
            "amount": 24000,
            "type": "Home Loan"
        },
        {
            "amount": 12000,
            "type": "Car Loan"
        }
    ]
}

export default FinanceProfile;
