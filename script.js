function taxCalculator() {
    return {
        salaryInput: '',
        isSalaried: true, 
        baseStandardDeduction: 75000, 

        get salary() {
            return Number(this.salaryInput.replace(/,/g, '')) || 0;
        },
        get standardDeduction() {
            return this.isSalaried ? this.baseStandardDeduction : 0;
        },
        get taxableSalary() {
            return Math.max(this.salary - this.standardDeduction, 0);
        },
        get slabs() {
            return [
                { range: "0 - 4 lakh", rate: "0%", tax: 0 },
                { range: "4 - 8 lakh", rate: "5%", tax: this.taxableSalary > 400000 ? Math.min(this.taxableSalary - 400000, 400000) * 0.05 : 0 },
                { range: "8 - 12 lakh", rate: "10%", tax: this.taxableSalary > 800000 ? Math.min(this.taxableSalary - 800000, 400000) * 0.10 : 0 },
                { range: "12 - 16 lakh", rate: "15%", tax: this.taxableSalary > 1200000 ? Math.min(this.taxableSalary - 1200000, 400000) * 0.15 : 0 },
                { range: "16 - 20 lakh", rate: "20%", tax: this.taxableSalary > 1600000 ? Math.min(this.taxableSalary - 1600000, 400000) * 0.20 : 0 },
                { range: "20 - 24 lakh", rate: "25%", tax: this.taxableSalary > 2000000 ? Math.min(this.taxableSalary - 2000000, 400000) * 0.25 : 0 },
                { range: "Above 24 lakh", rate: "30%", tax: this.taxableSalary > 2400000 ? (this.taxableSalary - 2400000) * 0.30 : 0 },
            ];
        },
        get totalTax() {
            return this.slabs.reduce((sum, slab) => sum + slab.tax, 0);
        },
        get rebate() {
            return this.taxableSalary <= 1200000 ? Math.min(this.totalTax, 60000) : 0;
        },
        get taxAfterRebate() {
            return Math.max(this.totalTax - this.rebate, 0);
        },
        get educationCess() {
            return this.taxAfterRebate * 0.04;
        },
        get totalTaxPayable() {
            return (this.taxAfterRebate + this.educationCess).toFixed(2);
        },
        formatSalary() {
            this.salaryInput = this.salary.toLocaleString();
        }
    };
}
