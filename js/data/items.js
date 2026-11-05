/**
 * GameData.items — Collectible items and memories
 */
window.GameData = window.GameData || {};

window.GameData.items = [
    // 4 Key items corresponding to asset/item.jpg
    {
        id: 'letter',
        name: 'Thư Tình Pixel',
        description: 'Lá thư tình ngọt ngào chứa chan nỗi nhớ',
        icon: '💌',
        zone: 'zone4',
        keyItem: true
    },
    {
        id: 'coffee',
        name: 'Cà Phê Đà Lạt',
        description: 'Ly cà phê nóng thơm nồng buổi sáng Đà Lạt se lạnh',
        icon: '☕',
        zone: 'zone2',
        keyItem: true
    },
    {
        id: 'strawberry',
        name: 'Dâu Tây Ngọt Ngào',
        description: 'Trái dâu tươi mọng nước hái tại vườn Đà Lạt',
        icon: '🍓',
        zone: 'zone1',
        keyItem: true
    },
    {
        id: 'heart',
        name: 'Trái Tim Tình Yêu',
        description: 'Tượng trưng cho tình yêu bền chặt 3 năm qua',
        icon: '💕',
        zone: 'zone3',
        keyItem: true
    },

    // Additional lovely collectibles
    { id: 'flower', name: 'Hoa Dã Quỳ', description: 'Bông hoa dại rực rỡ bên sườn đồi', icon: '🌼', zone: 'zone2' },
    { id: 'camera', name: 'Máy Ảnh Film', description: 'Lưu giữ những khoảnh khắc đẹp nhất của hai đứa', icon: '📷', zone: 'zone1' },
    { id: 'shell', name: 'Vỏ Ốc Biển', description: 'Vỏ ốc óng ánh nhặt từ bờ cát trắng', icon: '🐚', zone: 'zone3' },
    { id: 'starfish', name: 'Sao Biển Vàng', description: 'Chú sao biển nhỏ nằm nghe sóng vỗ', icon: '⭐', zone: 'zone3' },
    { id: 'pho', name: 'Tô Phở Nóng', description: 'Món ăn yêu thích mỗi chiều hẹn hò', icon: '🍜', zone: 'zone4' },
    { id: 'boba', name: 'Trà Sữa Full Topping', description: 'Ly trà sữa ngọt lịm em thích nhất', icon: '🧋', zone: 'zone4' },
    { id: 'pin', name: 'Huy Hiệu Đôi', description: 'Chiếc ghim cài áo kỷ niệm', icon: '✨', zone: 'zone1' },
    { id: 'ring', name: 'Nhẫn Kim Cương', description: 'Lời hẹn ước trăm năm trọn vẹn', icon: '💍', zone: 'zone5', keyItem: true },
    { id: 'music_box', name: 'Hộp Nhạc Gỗ', description: 'Khúc ca dịu êm của tình yêu', icon: '🎵', zone: 'zone5' },
    { id: 'icecream', name: 'Kem Ốc Quế', description: 'Chia nhau que kem ngọt ngào mùa hè', icon: '🍦', zone: 'zone3' },
    { id: 'scarf', name: 'Khăn Len Ấm', description: 'Chiếc khăn quàng chung giữa trời sương', icon: '🧣', zone: 'zone2' },
    { id: 'ticket', name: 'Vé Xe Kỷ Niệm', description: 'Chuyến xe đưa hai đứa đi muôn nơi', icon: '🎟️', zone: 'zone1' },
    { id: 'cake', name: 'Bánh Kem Kỷ Niệm', description: 'Thổi nến chúc mừng 3 năm yêu nhau', icon: '🎂', zone: 'zone5' },
    { id: 'balloon', name: 'Bóng Bay Trái Tim', description: 'Bay bổng như cảm xúc khi ở bên em', icon: '🎈', zone: 'zone1' },
    { id: 'firework', name: 'Pháo Hoa Rực Rỡ', description: 'Tỏa sáng rực rỡ như tình yêu của anh và em', icon: '🎆', zone: 'zone5' },
    { id: 'key', name: 'Chìa Khóa Trái Tim', description: 'Mở cửa trái tim ấm áp của Quang Vinh', icon: '🗝️', zone: 'zone5' }
];
