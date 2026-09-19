const navItems =
    document.querySelectorAll(".nav-item");

const pages = {
    dashboard:
        document.getElementById("dashboardPage"),

    create:
        document.getElementById("createPage"),

    invoices:
        document.getElementById("invoicesPage")
};


const pageTitle =
    document.getElementById("pageTitle");


const sidebar =
    document.getElementById("sidebar");


const menuBtn =
    document.getElementById("menuBtn");


const itemsContainer =
    document.getElementById("itemsContainer");


const previewItems =
    document.getElementById("previewItems");


const toast =
    document.getElementById("toast");

const fields = [

    "invoiceNumber",
    "invoiceStatus",
    "invoiceDate",
    "dueDate",
    "currency",

    "yourName",
    "businessName",
    "yourEmail",
    "yourPhone",
    "yourAddress",

    "clientName",
    "clientCompany",
    "clientEmail",
    "clientPhone",
    "clientAddress",

    "tax",
    "discount",

    "notes",
    "paymentTerms"

];

let editingInvoiceId = null;

let logoData = "";

const currencySymbols = {

    INR: "₹",

    USD: "$",

    EUR: "€",

    GBP: "£"

};

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupDefaultInvoice();

        addItem();

        updatePreview();

        renderDashboard();

        renderInvoices();

    }
);

navItems.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const page =
                button.dataset.page;

            showPage(page);

            sidebar.classList.remove("open");

        }

    );

});


function showPage(pageName) {

    Object.values(pages).forEach(page => {

        page.classList.remove(
            "active-page"
        );

    });


    pages[pageName]
        .classList.add(
            "active-page"
        );


    navItems.forEach(item => {

        item.classList.remove(
            "active"
        );


        if (
            item.dataset.page === pageName
        ) {

            item.classList.add(
                "active"
            );

        }

    });


    const titles = {

        dashboard: "Dashboard",

        create: "Create Invoice",

        invoices: "Invoices"

    };


    pageTitle.textContent =
        titles[pageName];

}

menuBtn.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "open"
        );

    }
);

document
    .getElementById("topNewInvoice")
    .addEventListener(
        "click",
        startNewInvoice
    );


document
    .getElementById("dashboardCreateBtn")
    .addEventListener(
        "click",
        startNewInvoice
    );


document
    .getElementById("invoicePageCreateBtn")
    .addEventListener(
        "click",
        startNewInvoice
    );


function startNewInvoice() {

    resetForm();

    showPage("create");

}

function setupDefaultInvoice() {

    document.getElementById(
        "invoiceNumber"
    ).value =
        generateInvoiceNumber();


    const today =
        new Date();


    const dueDate =
        new Date();


    dueDate.setDate(
        today.getDate() + 10
    );


    document.getElementById(
        "invoiceDate"
    ).value =
        formatInputDate(today);


    document.getElementById(
        "dueDate"
    ).value =
        formatInputDate(dueDate);


    document.getElementById(
        "invoiceStatus"
    ).value =
        "Pending";


    document.getElementById(
        "currency"
    ).value =
        "INR";


    document.getElementById(
        "tax"
    ).value =
        "18";


    document.getElementById(
        "discount"
    ).value =
        "0";


    document.getElementById(
        "notes"
    ).value =
        "Thank you for your business!";


    document.getElementById(
        "paymentTerms"
    ).value =
        "Payment is due within 10 days.";

}

function generateInvoiceNumber() {

    const year =
        new Date().getFullYear();


    const invoices =
        getInvoices();


    const number =
        String(
            invoices.length + 1
        ).padStart(3, "0");


    return `INV-${year}-${number}`;

}

document
    .getElementById("addItemBtn")
    .addEventListener(
        "click",
        () => {

            addItem();

            updatePreview();

        }
    );


function addItem(
    description = "",
    quantity = 1,
    rate = 0
) {

    const row =
        document.createElement(
            "div"
        );


    row.className =
        "item-row";


    row.innerHTML = `

        <input
            type="text"
            class="item-description"
            placeholder="Website Design"
            value="${escapeAttribute(description)}"
        >


        <input
            type="number"
            class="item-quantity"
            min="1"
            value="${quantity}"
        >


        <input
            type="number"
            class="item-rate"
            min="0"
            value="${rate}"
        >


        <div class="item-amount">
            ₹0.00
        </div>


        <button
            type="button"
            class="delete-item">

            ×

        </button>

    `;


    itemsContainer.appendChild(
        row
    );


    row.querySelectorAll("input")
        .forEach(input => {

            input.addEventListener(
                "input",
                updatePreview
            );

        });


    row.querySelector(
        ".delete-item"
    ).addEventListener(
        "click",
        () => {

            row.remove();

            updatePreview();

        }
    );

}

function getItems() {

    const rows =
        document.querySelectorAll(
            ".item-row"
        );


    const items = [];


    rows.forEach(row => {

        const description =
            row.querySelector(
                ".item-description"
            ).value.trim();


        const quantity =
            Number(
                row.querySelector(
                    ".item-quantity"
                ).value
            ) || 0;


        const rate =
            Number(
                row.querySelector(
                    ".item-rate"
                ).value
            ) || 0;


        const amount =
            quantity * rate;


        row.querySelector(
            ".item-amount"
        ).textContent =
            formatCurrency(
                amount
            );


        items.push({

            description,

            quantity,

            rate,

            amount

        });

    });


    return items;

}

function updatePreview() {

    const currency =
        getValue("currency") ||
        "INR";


    setText(
        "previewBusiness",
        getValue("businessName") ||
        "Your Business"
    );


    setText(
        "previewYourName",
        getValue("yourName") ||
        "Your Name"
    );


    setText(
        "previewInvoiceNumber",
        getValue("invoiceNumber") ||
        "INV-2026-001"
    );


    setText(
        "previewInvoiceDate",
        formatDisplayDate(
            getValue("invoiceDate")
        )
    );


    setText(
        "previewDueDate",
        formatDisplayDate(
            getValue("dueDate")
        )
    );


    setText(
        "previewFromName",
        getValue("yourName") ||
        "Your Name"
    );


    setText(
        "previewFromBusiness",
        getValue("businessName") ||
        "Your Business"
    );


    setText(
        "previewFromEmail",
        getValue("yourEmail") ||
        "your@email.com"
    );


    setText(
        "previewFromPhone",
        getValue("yourPhone") ||
        "—"
    );


    setText(
        "previewFromAddress",
        getValue("yourAddress") ||
        "—"
    );


    setText(
        "previewClientName",
        getValue("clientName") ||
        "Client Name"
    );


    setText(
        "previewClientCompany",
        getValue("clientCompany") ||
        "Client Company"
    );


    setText(
        "previewClientEmail",
        getValue("clientEmail") ||
        "client@email.com"
    );


    setText(
        "previewClientPhone",
        getValue("clientPhone") ||
        "—"
    );


    setText(
        "previewClientAddress",
        getValue("clientAddress") ||
        "—"
    );


    /* STATUS */

    const status =
        getValue(
            "invoiceStatus"
        ) ||
        "Pending";


    const statusElement =
        document.getElementById(
            "previewStatus"
        );


    statusElement.textContent =
        status;


    statusElement.className =
        "status-badge " +
        status.toLowerCase();


    /* ITEMS */

    const items =
        getItems();


    previewItems.innerHTML =
        "";


    items.forEach(item => {

        if (
            item.description ||
            item.rate > 0
        ) {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "preview-item";


            row.innerHTML = `

                <span>
                    ${escapeHTML(
                        item.description ||
                        "Service"
                    )}
                </span>

                <span>
                    ${item.quantity}
                </span>

                <span>
                    ${formatCurrency(
                        item.rate,
                        currency
                    )}
                </span>

                <span>
                    ${formatCurrency(
                        item.amount,
                        currency
                    )}
                </span>

            `;


            previewItems.appendChild(
                row
            );

        }

    });


    /* CALCULATIONS */

    const subtotal =
        items.reduce(
            (total, item) =>
                total + item.amount,
            0
        );


    const taxPercent =
        Number(
            getValue("tax")
        ) || 0;


    const discountPercent =
        Number(
            getValue("discount")
        ) || 0;


    const taxAmount =
        subtotal *
        taxPercent /
        100;


    const discountAmount =
        subtotal *
        discountPercent /
        100;


    const total =
        subtotal +
        taxAmount -
        discountAmount;


    /* TOTALS */

    setText(
        "previewSubtotal",
        formatCurrency(
            subtotal,
            currency
        )
    );


    setText(
        "previewTax",
        formatCurrency(
            taxAmount,
            currency
        )
    );


    setText(
        "previewDiscount",
        formatCurrency(
            discountAmount,
            currency
        )
    );


    setText(
        "previewTotal",
        formatCurrency(
            total,
            currency
        )
    );


    setText(
        "previewTaxPercent",
        taxPercent
    );


    setText(
        "previewDiscountPercent",
        discountPercent
    );


    setText(
        "previewNotes",
        getValue("notes") ||
        "Thank you for your business!"
    );


    setText(
        "previewPaymentTerms",
        getValue(
            "paymentTerms"
        ) ||
        "Payment is due within 10 days."
    );

}

fields.forEach(id => {

    const element =
        document.getElementById(id);


    element.addEventListener(
        "input",
        updatePreview
    );


    element.addEventListener(
        "change",
        updatePreview
    );

});

document
    .getElementById("logoInput")
    .addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            if (!file) {
                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    logoData =
                        event.target.result;


                    showLogo(
                        logoData
                    );

                };


            reader.readAsDataURL(
                file
            );

        }
    );


function showLogo(src) {

    const logoPreview =
        document.getElementById(
            "logoPreview"
        );


    const invoiceLogo =
        document.getElementById(
            "invoiceLogo"
        );


    logoPreview.innerHTML = `

        <img
            src="${src}"
            alt="Logo">

    `;


    invoiceLogo.innerHTML = `

        <img
            src="${src}"
            alt="Business Logo">

    `;

}

document
    .getElementById(
        "saveInvoiceBtn"
    )
    .addEventListener(
        "click",
        saveInvoice
    );


function saveInvoice() {

    const invoices =
        getInvoices();


    const items =
        getItems();


    const subtotal =
        items.reduce(
            (total, item) =>
                total + item.amount,
            0
        );


    const taxPercent =
        Number(
            getValue("tax")
        ) || 0;


    const discountPercent =
        Number(
            getValue("discount")
        ) || 0;


    const taxAmount =
        subtotal *
        taxPercent /
        100;


    const discountAmount =
        subtotal *
        discountPercent /
        100;


    const total =
        subtotal +
        taxAmount -
        discountAmount;


    const invoice = {

        id:
            editingInvoiceId ||
            Date.now().toString(),

        invoiceNumber:
            getValue("invoiceNumber"),

        status:
            getValue("invoiceStatus"),

        invoiceDate:
            getValue("invoiceDate"),

        dueDate:
            getValue("dueDate"),

        currency:
            getValue("currency"),

        yourName:
            getValue("yourName"),

        businessName:
            getValue("businessName"),

        yourEmail:
            getValue("yourEmail"),

        yourPhone:
            getValue("yourPhone"),

        yourAddress:
            getValue("yourAddress"),

        clientName:
            getValue("clientName"),

        clientCompany:
            getValue("clientCompany"),

        clientEmail:
            getValue("clientEmail"),

        clientPhone:
            getValue("clientPhone"),

        clientAddress:
            getValue("clientAddress"),

        tax:
            taxPercent,

        discount:
            discountPercent,

        notes:
            getValue("notes"),

        paymentTerms:
            getValue("paymentTerms"),

        items,

        subtotal,

        taxAmount,

        discountAmount,

        total,

        logo:
            logoData,

        updatedAt:
            new Date().toISOString()

    };


    if (editingInvoiceId) {

        const index =
            invoices.findIndex(
                item =>
                    item.id ===
                    editingInvoiceId
            );


        if (index !== -1) {

            invoices[index] =
                invoice;

        }

    } else {

        invoices.push(
            invoice
        );

    }


    localStorage.setItem(
        "invoiceProInvoices",
        JSON.stringify(
            invoices
        )
    );


    editingInvoiceId =
        invoice.id;


    renderDashboard();

    renderInvoices();


    showToast(
        "Invoice saved successfully!"
    );

}

function getInvoices() {

    const data =
        localStorage.getItem(
            "invoiceProInvoices"
        );


    if (!data) {

        return [];

    }


    try {

        return JSON.parse(
            data
        );

    } catch {

        return [];

    }

}

function editInvoice(id) {

    const invoices =
        getInvoices();


    const invoice =
        invoices.find(
            item =>
                item.id === id
        );


    if (!invoice) {
        return;
    }


    editingInvoiceId =
        invoice.id;


    fields.forEach(field => {

        const element =
            document.getElementById(
                field
            );


        if (
            invoice[field] !==
            undefined
        ) {

            element.value =
                invoice[field];

        }

    });


    itemsContainer.innerHTML =
        "";


    if (
        invoice.items &&
        invoice.items.length
    ) {

        invoice.items.forEach(
            item => {

                addItem(
                    item.description,
                    item.quantity,
                    item.rate
                );

            }
        );

    } else {

        addItem();

    }


    logoData =
        invoice.logo || "";


    if (logoData) {

        showLogo(
            logoData
        );

    } else {

        resetLogo();

    }


    updatePreview();

    showPage("create");

}

function deleteInvoice(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this invoice?"
        );


    if (!confirmed) {
        return;
    }


    const invoices =
        getInvoices()
            .filter(
                invoice =>
                    invoice.id !== id
            );


    localStorage.setItem(
        "invoiceProInvoices",
        JSON.stringify(
            invoices
        )
    );


    renderDashboard();

    renderInvoices();


    showToast(
        "Invoice deleted."
    );

}

function renderDashboard() {

    const invoices =
        getInvoices();


    let total =
        0;

    let paid =
        0;

    let pending =
        0;

    let overdue =
        0;


    invoices.forEach(invoice => {

        const amount =
            Number(
                invoice.total
            ) || 0;


        total += amount;


        if (
            invoice.status ===
            "Paid"
        ) {

            paid += amount;

        }


        if (
            invoice.status ===
            "Pending"
        ) {

            pending += amount;

        }


        if (
            invoice.status ===
            "Overdue"
        ) {

            overdue += amount;

        }

    });


    document.getElementById(
        "totalRevenue"
    ).textContent =
        formatCurrency(
            total,
            "INR"
        );


    document.getElementById(
        "paidAmount"
    ).textContent =
        formatCurrency(
            paid,
            "INR"
        );


    document.getElementById(
        "pendingAmount"
    ).textContent =
        formatCurrency(
            pending,
            "INR"
        );


    document.getElementById(
        "overdueAmount"
    ).textContent =
        formatCurrency(
            overdue,
            "INR"
        );


    renderRecentInvoices(
        invoices
    );

}


function renderRecentInvoices(
    invoices
) {

    const container =
        document.getElementById(
            "recentInvoices"
        );


    container.innerHTML =
        "";


    const recent =
        [...invoices]
            .reverse()
            .slice(0, 5);


    if (!recent.length) {

        container.innerHTML = `

            <tr>

                <td colspan="6">

                    <div class="empty-state">

                        <div class="empty-state-icon">
                            🧾
                        </div>

                        <h3>
                            No invoices yet
                        </h3>

                        <p>
                            Create your first invoice to get started.
                        </p>

                    </div>

                </td>

            </tr>

        `;

        return;

    }


    recent.forEach(
        invoice => {

            container.appendChild(
                createInvoiceRow(
                    invoice
                )
            );

        }
    );

}

function renderInvoices(
    searchTerm = ""
) {

    const container =
        document.getElementById(
            "allInvoices"
        );


    if (!container) {
        return;
    }


    const invoices =
        getInvoices();


    const search =
        searchTerm
            .toLowerCase()
            .trim();


    const filtered =
        invoices.filter(
            invoice => {

                return (

                    invoice.invoiceNumber
                        .toLowerCase()
                        .includes(search)

                    ||

                    invoice.clientName
                        .toLowerCase()
                        .includes(search)

                    ||

                    invoice.clientCompany
                        .toLowerCase()
                        .includes(search)

                );

            }
        );


    container.innerHTML =
        "";


    if (!filtered.length) {

        container.innerHTML = `

            <tr>

                <td colspan="6">

                    <div class="empty-state">

                        <div class="empty-state-icon">
                            🔎
                        </div>

                        <h3>
                            No invoices found
                        </h3>

                        <p>
                            Try another search or create a new invoice.
                        </p>

                    </div>

                </td>

            </tr>

        `;

        return;

    }


    [...filtered]
        .reverse()
        .forEach(
            invoice => {

                container.appendChild(
                    createInvoiceRow(
                        invoice
                    )
                );

            }
        );

}

function createInvoiceRow(
    invoice
) {

    const row =
        document.createElement(
            "tr"
        );


    const currency =
        invoice.currency ||
        "INR";


    row.innerHTML = `

        <td>

            <strong>
                ${escapeHTML(
                    invoice.invoiceNumber
                )}
            </strong>

        </td>


        <td>

            ${escapeHTML(
                invoice.clientName ||
                "No Client"
            )}

        </td>


        <td>

            ${formatDisplayDate(
                invoice.invoiceDate
            )}

        </td>


        <td>

            ${formatCurrency(
                invoice.total,
                currency
            )}

        </td>


        <td>

            <span
                class="status ${invoice.status.toLowerCase()}">

                ${invoice.status}

            </span>

        </td>


        <td>

            <div class="table-actions">

                <button
                    class="table-btn"
                    onclick="editInvoice('${invoice.id}')">

                    Edit

                </button>


                <button
                    class="table-btn"
                    onclick="deleteInvoice('${invoice.id}')">

                    Delete

                </button>

            </div>

        </td>

    `;


    return row;

}

document
    .getElementById(
        "searchInvoice"
    )
    .addEventListener(
        "input",
        function () {

            renderInvoices(
                this.value
            );

        }
    );

document
    .getElementById(
        "viewAllBtn"
    )
    .addEventListener(
        "click",
        () => {

            showPage(
                "invoices"
            );

        }
    );

document
    .getElementById(
        "cancelBtn"
    )
    .addEventListener(
        "click",
        () => {

            showPage(
                "dashboard"
            );

        }
    );

document
    .getElementById(
        "printBtn"
    )
    .addEventListener(
        "click",
        () => {

            window.print();

        }
    );

function resetForm() {

    fields.forEach(
        field => {

            const element =
                document.getElementById(
                    field
                );


            element.value = "";

        }
    );


    setupDefaultInvoice();


    itemsContainer.innerHTML =
        "";


    addItem();


    editingInvoiceId =
        null;


    resetLogo();


    updatePreview();

}

function resetLogo() {

    logoData = "";


    document.getElementById(
        "logoPreview"
    ).innerHTML =
        "<span>+</span>";


    document.getElementById(
        "invoiceLogo"
    ).textContent =
        "I";


    document.getElementById(
        "logoInput"
    ).value = "";

}

function getValue(id) {

    return document
        .getElementById(id)
        .value
        .trim();

}


function setText(
    id,
    value
) {

    document.getElementById(
        id
    ).textContent =
        value;

}

function formatCurrency(
    amount,
    currency = "INR"
) {

    const symbol =
        currencySymbols[
            currency
        ] || "₹";


    return (
        symbol +
        Number(
            amount || 0
        ).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )
    );

}

function formatInputDate(
    date
) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;

}


function formatDisplayDate(
    dateString
) {

    if (!dateString) {

        return "—";

    }


    const date =
        new Date(
            dateString +
            "T00:00:00"
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "—";

    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function escapeHTML(
    text
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


function escapeAttribute(
    text
) {

    return String(text)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        );

}

function showToast(
    message
) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}