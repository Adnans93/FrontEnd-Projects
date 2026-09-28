// ============================================================
// أكاديمية البرمجة - سكربت مشترك لكل الصفحات
// ============================================================

// 1. تبديل المظهر (فاتح / داكن) وحفظه في المتصفح
function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    document.querySelectorAll('[data-theme-toggle] i').forEach(icon => {
        icon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars';
    });
}

document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-bs-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
});
setTheme(localStorage.getItem('theme') || 'light');

// 2. رسالة تأكيد صغيرة (Toast)
function showToast(message) {
    const el = document.getElementById('appToast');
    if (!el) return;
    el.querySelector('[data-toast-text]').textContent = message;
    bootstrap.Toast.getOrCreateInstance(el, { delay: 3500 }).show();
}

// 3. التحقق من النماذج بأسلوب Bootstrap + رسالة نجاح بدل إعادة تحميل الصفحة
document.querySelectorAll('form.needs-validation').forEach(form => {
    form.addEventListener('submit', event => {
        event.preventDefault();

        // تطابق كلمتي المرور (إن وجدتا)
        const password = form.querySelector('[data-password]');
        const confirm = form.querySelector('[data-password-confirm]');
        if (password && confirm) {
            confirm.setCustomValidity(confirm.value && confirm.value !== password.value ? 'mismatch' : '');
        }

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        showToast(form.dataset.toast || 'تم الحفظ بنجاح');
        if (form.dataset.reset !== 'false') {
            form.reset();
        }
        form.classList.remove('was-validated');
    });
});

// 4. تفعيل التلميحات (Tooltips)
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
