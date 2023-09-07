export function generateUUID(email) {
  // convert email to lowercase and trim any leading or trailing spaces
  email = email.toLowerCase().trim();

  // create a SHA256 hash of the email address
  const sha256 = msg => {
    function rotateRight(n, x) {
      return ((x >>> n) | (x << (32 - n))) >>> 0;
    }
    function sha256Frag() {
      const constants = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
        0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
        0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
        0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
        0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
        0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
        0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
        0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
        0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
      ];
      const K = new Uint32Array(constants);
      const W = new Uint32Array(64);
      let a = 0x6a09e667;
      let b = 0xbb67ae85;
      let c = 0x3c6ef372;
      let d = 0xa54ff53a;
      let e = 0x510e527f;
      let f = 0x9b05688c;
      let g = 0x1f83d9ab;
      let h = 0x5be0cd19;
      
      const toHex = n => n.toString(16).padStart(8, '0');
      const toUint32Array = (str) => {
        if (typeof str !== 'string') {
          str = str.toString();
        }
        if (!str.length) {
          return new Uint32Array(0);
        }
        const result = new Uint32Array(str.length / 4);
        for (let i = 0; i < str.length; i += 4) {
          result[i / 4] = (str.charCodeAt(i) << 24) |
                          (str.charCodeAt(i + 1) << 16) |
                          (str.charCodeAt(i + 2) << 8) |
                          (str.charCodeAt(i + 3));
        }
        return result;
      };
      const padTo512 = (bits) => {
        const paddingLength = (448 - bits.length - 1) % 512;
        const padding = new Uint8Array(paddingLength / 8 + 1).fill(0);
        const bitsLength = bits.length * 8;
        const bitsLengthArray = new Uint8Array(8);
        for (let i = 0; i < 8; i++) {
          bitsLengthArray[i] = (bitsLength >>> (56 - 8 * i)) & 0xff;
        }
        const bytes = new Uint8Array(bits.length + 1 + padding.length + bitsLengthArray.length);

        for (let i = 0; i < bits.length; i++) {
          bytes[i] = bits[i];
        }

        bytes[bits.length] = 0x80;

        for (let j = 0; j < padding.length; j++) {
          bytes[bits.length + 1 + j] = padding[j];
        }

        for (let k = 0; k < bitsLengthArray.length; k++) {
          bytes[bits.length + 1 + padding.length + k] = bitsLengthArray[k];
        }

        return bytes;
      };
      
      const chars = msg.split('').map(function(x) { return x.charCodeAt(0); });
      const padded = padTo512(chars);
      const message = toUint32Array(padded);
      
      for (let i = 0; i < message.length; i += 16) {
        const w = W;
        for (let t = 0; t < 16; t++) {
          w[t] = message[i + t];
        }
        for (let t = 16; t < 64; t++) {
          const s0 = rotateRight(7, w[t - 15]) ^ rotateRight(18, w[t - 15]) ^ (w[t - 15] >>> 3);
          const s1 = rotateRight(17, w[t - 2]) ^ rotateRight(19, w[t - 2]) ^ (w[t - 2] >>> 10);
          w[t] = (w[t - 16] + s0 + w[t - 7] + s1) >>> 0;
        }
        let A = a;
        let B = b;
        let C = c;
        let D = d;
        let E = e;
        let F = f;
        let G = g;
        let H = h;
        for (let t = 0; t < 64; t++) {
          const S1 = rotateRight(6, e) ^ rotateRight(11, e) ^ rotateRight(25, e);
          const ch = (e & f) ^ (~e & g);
          const temp1 = (h + S1 + ch + K[t] + w[t]) >>> 0;
          const S0 = rotateRight(2, a) ^ rotateRight(13, a) ^ rotateRight(22, a);
          const maj = (a & b) ^ (a & c) ^ (b & c);
          const temp2 = (S0 + maj) >>> 0;
          H = G;
          G = F;
          F = E;
          E = (D + temp1) >>> 0;
          D = C;
          C = B;
          B = A;
          A = (temp1 + temp2) >>> 0;
        }
        a = (a + A) >>> 0;
        b = (b + B) >>> 0;
        c = (c + C) >>> 0;
        d = (d + D) >>> 0;
        e = (e + E) >>> 0;
        f = (f + F) >>> 0;
        g = (g + G) >>> 0;
        h = (h + H) >>> 0;
      }

      return [a, b, c, d, e, f, g, h].map(toHex).join('');
    }

    return sha256Frag();
  };

  // construct UUID from hash
  const hash = sha256(email);
  const uuid = hash.slice(0, 8) + '-' + hash.slice(8, 12) + '-4' + hash.slice(13, 16) + '-a' + hash.slice(17, 20) + '-'+ hash.slice(20);
  
  return uuid;
}