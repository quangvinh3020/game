/**
 * GameData.dialogues — Dialogue scripts for all scenes and checkpoints
 */
window.GameData = window.GameData || {};

window.GameData.dialogues = {
    intro: [
        { speaker: '', text: '💤 ... zzz ...', portrait: null },
        { speaker: 'Việt Nga', text: '*Chớp mắt tỉnh dậy*... Ủa, đây là đâu thế này? Một căn phòng pixel dễ thương quá!', portrait: 'nga' },
        { speaker: 'Việt Nga', text: 'Kìa, trên bàn có một lá thư phát sáng lấp lánh!', portrait: 'nga' },
        { speaker: 'Quang Vinh', text: '"Em ơi, tỉnh dậy đi! Anh đã chuẩn bị một hành trình đặc biệt cho kỷ niệm 3 năm của chúng mình..."', portrait: 'vinh' },
        { speaker: 'Quang Vinh', text: '"Hãy đi theo con đường và cùng anh thu thập lại những kỷ niệm đẹp nhất nhé. Anh chờ em ở cuối con đường! 💕"', portrait: 'vinh' }
    ],

    zone1: [
        { speaker: '', text: 'Một con đường rực rỡ hoa anh đào bay trong gió xuân... 🌸', portrait: null },
        { speaker: 'Việt Nga', text: 'Cảnh tượng này giống như ngày đầu tiên anh Vinh hẹn gặp mình vậy!', portrait: 'nga' },
        { speaker: 'Quang Vinh', text: '"Chào em! Ngày đầu gặp em, tim anh đập rộn ràng như những cánh hoa này vậy. Em thử hứng xem được bao nhiêu cánh nhé!"', portrait: 'vinh' }
    ],
    zone1_complete: [
        { speaker: 'Việt Nga', text: 'Yay! Mình đã hứng được đủ hoa đào rồi! 🌸', portrait: 'nga' },
        { speaker: 'Quang Vinh', text: '"Em khéo tay quá! Mỗi cánh hoa rơi xuống là một kỷ niệm ngọt ngào anh luôn khắc ghi trong tim."', portrait: 'vinh' },
        { speaker: '', text: '✨ Nhận được: Thư tình #2 "Mùa Xuân Gặp Gỡ" & Dâu Tây Ngọt Ngào 🍓', portrait: null }
    ],

    zone2: [
        { speaker: '', text: 'Đà Lạt mộng mơ hiện ra trước mắt... Những rặng thông xanh ngát trong làn sương mờ 🌲', portrait: null },
        { speaker: 'Việt Nga', text: 'Ôi, chuyến đi ngày 01/11/2023! Trời lạnh nhưng trong lòng ấm áp vô cùng.', portrait: 'nga' },
        { speaker: 'Quang Vinh', text: '"Em còn nhớ bức ảnh kỷ niệm tụi mình chụp bên đồi thông không? Hãy cùng ghép lại từng mảnh ký ức nhé! 🧩"', portrait: 'vinh' }
    ],
    zone2_complete: [
        { speaker: 'Việt Nga', text: 'Bức tranh Đà Lạt hiện ra nguyên vẹn rồi! Đẹp quá đi mất...', portrait: 'nga' },
        { speaker: 'Quang Vinh', text: '"Cảm ơn em đã cùng anh tạo nên chuyến đi tuyệt vời nhất đời anh!"', portrait: 'vinh' },
        { speaker: '', text: '✨ Nhận được: Thư tình #3 "Đà Lạt Mộng Mơ" & Ly Cà Phê Ấm Áp ☕', portrait: null }
    ],

    zone3: [
        { speaker: '', text: 'Tiếng sóng vỗ rì rào... Gió biển mát rượi và bãi cát vàng trải dài 🌊', portrait: null },
        { speaker: 'Việt Nga', text: 'Biển xanh quá! Lần đi biển đó hai đứa chơi vui ơi là vui.', portrait: 'nga' },
        { speaker: 'Quang Vinh', text: '"Bờ cát có rất nhiều vỏ ốc và sao biển xinh xắn. Em hãy nhặt thật nhiều để mang về làm kỷ niệm nhé! 🐚"', portrait: 'vinh' }
    ],
    zone3_complete: [
        { speaker: 'Việt Nga', text: 'Mình nhặt được cả một giỏ đầy vỏ ốc và tìm thấy chiếc chai chứa thông điệp bí mật nữa!', portrait: 'nga' },
        { speaker: 'Quang Vinh', text: '"Dù sóng biển có dâng cao bao nhiêu, anh vẫn sẽ luôn nắm chặt tay em, không bao giờ buông."', portrait: 'vinh' },
        { speaker: '', text: '✨ Nhận được: Thư tình #4 "Biển Xanh & Em" & Trái Tim Tình Yêu 💕', portrait: null }
    ],

    zone4: [
        { speaker: '', text: 'Một quán ăn nhỏ ấm cúng, đèn lồng vàng lung linh, mùi thức ăn thơm nức mũi 🏮🍜', portrait: null },
        { speaker: 'Việt Nga', text: 'Đây là góc quán quen của hai đứa mình này! Bao nhiêu bữa ăn ngon, bao nhiêu câu chuyện cười...', portrait: 'nga' },
        { speaker: 'Quang Vinh', text: '"Hôm nay em làm bếp trưởng nhé! Hãy chọn đúng nguyên liệu để nấu những món hai đứa mình thích nhất nha! 🍳"', portrait: 'vinh' }
    ],
    zone4_complete: [
        { speaker: 'Việt Nga', text: 'Nấu xong cả 3 món rồi! Bốc khói nghi ngút, ngon mắt quá chừng!', portrait: 'nga' },
        { speaker: 'Quang Vinh', text: '"Ngon tuyệt vời! Cơm có thể bình dị, nhưng chỉ cần ngồi ăn cùng em là bữa tiệc ngon nhất đời anh."', portrait: 'vinh' },
        { speaker: '', text: '✨ Nhận được: Thư tình #5 "Góc Nhỏ Của Hai Đứa" & Thư Tình Pixel 💌', portrait: null }
    ],

    zone5: [
        { speaker: '', text: 'Một khoảng trời đêm lung linh ngàn vì sao sáng... Đèn fairy lights lấp lánh như trong truyện cổ tích ✨', portrait: null },
        { speaker: 'Việt Nga', text: 'Nơi này... đẹp đến nghẹt thở. Anh Vinh đang đứng chờ mình kìa!', portrait: 'nga' },
        { speaker: 'Quang Vinh', text: '"Việt Nga ơi... Cuối cùng em cũng đã đi hết chặng đường này rồi."', portrait: 'vinh' }
    ],
    zone5_proposal: [
        { speaker: 'Quang Vinh', text: '"Việt Nga ơi..."', portrait: 'vinh' },
        { speaker: 'Quang Vinh', text: '"3 năm qua, 1095 ngày... Mỗi giây phút bên em đều là món quà quý giá nhất mà cuộc đời trao tặng cho anh."', portrait: 'vinh' },
        { speaker: 'Quang Vinh', text: '"Từ những ngày đầu rụt rè hẹn hò, đến cái lạnh ngọt ngào ở Đà Lạt..."', portrait: 'vinh' },
        { speaker: 'Quang Vinh', text: '"Từ những chiều ngắm biển lộng gió, đến những bữa cơm ấm áp bình dị mỗi ngày..."', portrait: 'vinh' },
        { speaker: 'Quang Vinh', text: '"Anh biết trái tim mình đã thuộc trọn vẹn về em."', portrait: 'vinh' },
        { speaker: 'Quang Vinh', text: '"Việt Nga, em có đồng ý cùng anh viết tiếp câu chuyện tình yêu này... mãi mãi không? 💍"', portrait: 'vinh',
          choices: ['Em đồng ý! 💕', 'Em đồng ý x1000 lần! 💖💖💖'] }
    ],
    zone5_yes: [
        { speaker: 'Quang Vinh', text: '"Cảm ơn em! Cảm ơn người con gái tuyệt vời nhất của anh! 💍"', portrait: 'vinh' },
        { speaker: '', text: '🎆 Pháo hoa bừng sáng khắp bầu trời đêm! Những cánh hoa hồng và trái tim rơi đầy... 🎆', portrait: null },
        { speaker: '', text: '✨ QUANG VINH & VIỆT NGA: 3 NĂM VÀ MÃI MÃI VỀ SAU ✨', portrait: null }
    ],

    ending: [
        { speaker: '', text: 'Hành trình 3 năm vừa qua chỉ là chương mở đầu cho một tình yêu trọn vẹn.', portrait: null },
        { speaker: 'Quang Vinh', text: '"Cảm ơn em đã yêu anh, thương anh và cùng anh chia sẻ từng khoảnh khắc cuộc đời."', portrait: 'vinh' },
        { speaker: 'Việt Nga', text: '"Yêu anh nhiều lắm, người bạn đời tương lai của em! 💕"', portrait: 'nga' }
    ]
};
