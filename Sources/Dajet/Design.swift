import SwiftUI
import AppKit

// The design layer now lives in the DajetUI package next door — palette,
// typography, radii, chrome metrics, motion, Look — opened wholesale into
// this module, so the rest of the browser keeps writing `Palette.ink` and
// `Motion.settle` without knowing where they come from. What stays here is
// the browser's own: metrics nobody else has, the logomark, and the shake.
@_exported import DajetUI

/// Metrics nobody else in the line has; the shared ones live in DajetUI.
extension Metrics {
    /// The same three doors again, in the sidebar, where they sit right of
    /// the lights instead. The column already has 10 of horizontal padding
    /// of its own before this even starts, so this is the lights' own edge
    /// (79) less that padding, plus a sliver of air — not the full breathing
    /// room a tab row gets, because the sidebar's minimum width doesn't have
    /// it to give.
    static let sideLights: CGFloat = 72
    /// Narrower than tabWidth, a tab shows its site's mark alone.
    static let tabTitled: CGFloat = 80
    /// A pinned tab is a square the height of the row, holding one letter.
    static let pinWidth: CGFloat = 30
    /// The square at the end of the row that opens a new page.
    static let plusWidth: CGFloat = 30
}

extension Motion {
    /// The Mac's Reduce Motion, for the browser's own effects (the shake).
    static var reduced: Bool {
        NSWorkspace.shared.accessibilityDisplayShouldReduceMotion
    }
}

/// Dajet's mark — Datum, a D reduced to an aperture: the outer bowl with
/// the counter cut out of it, read from its own path data rather than
/// loaded from a file, so it stays a crisp vector at any size. No plate,
/// no square behind it: the mark draws exactly what the source file has
/// and nothing it doesn't, the way every other icon in this app is a bare
/// shape rather than a shape on a background. The one exception is the
/// macOS app icon (`Icon/icon.swift`), which needs an opaque square
/// whether the mark wants one or not — that's the Dock's requirement,
/// not the logo's.
struct Logomark: Shape {
    /// The source's own canvas: 100 × 100, nothing outside it.
    static let canvas = CGSize(width: 100, height: 100)

    /// A D reduced to an aperture. The same path as Icon/icon.swift and
    /// the website's mark. The counter runs counter-clockwise against the
    /// bowl, so it cuts out under either winding rule.
    private static let data = "M 12.5 12.5 H 48 C 71.2 12.5 87.5 27.4 87.5 50 C 87.5 72.6 71.2 87.5 48 87.5 H 12.5 Z M 31.5 31 V 69 H 48 C 59.9 69 68.5 62.6 68.5 50 C 68.5 37.4 59.9 31 48 31 Z"

    func path(in rect: CGRect) -> Path {
        // Fit the canvas into whatever frame this is given, centred, at the
        // larger scale that still keeps it inside — an SVG viewBox's "meet".
        let scale = min(rect.width / Logomark.canvas.width, rect.height / Logomark.canvas.height)
        let ox = rect.midX - Logomark.canvas.width * scale / 2
        let oy = rect.midY - Logomark.canvas.height * scale / 2
        func pt(_ x: CGFloat, _ y: CGFloat) -> CGPoint { CGPoint(x: ox + x * scale, y: oy + y * scale) }
        var path = Path()
        var last = CGPoint.zero
        var start = CGPoint.zero
        for (c, n) in Logomark.commands {
            switch c {
            case "M": last = CGPoint(x: n[0], y: n[1]); start = last; path.move(to: pt(n[0], n[1]))
            case "L": last = CGPoint(x: n[0], y: n[1]); path.addLine(to: pt(n[0], n[1]))
            case "H": last.x = n[0]; path.addLine(to: pt(last.x, last.y))
            case "V": last.y = n[0]; path.addLine(to: pt(last.x, last.y))
            case "C":
                var k = 0
                while k + 5 < n.count {
                    path.addCurve(to: pt(n[k + 4], n[k + 5]), control1: pt(n[k], n[k + 1]), control2: pt(n[k + 2], n[k + 3]))
                    last = CGPoint(x: n[k + 4], y: n[k + 5])
                    k += 6
                }
            case "Z": path.closeSubpath(); last = start
            default: break
            }
        }
        return path
    }

    /// Read once. Absolute M, L, H, V, C, Z — what Figma writes for a
    /// flattened shape, and nothing else is needed.
    private static let commands: [(Character, [CGFloat])] = {
        var out: [(Character, [CGFloat])] = []
        var current: Character?
        var numbers: [CGFloat] = []
        var token = ""
        func flush() {
            if !token.isEmpty, let v = Double(token) { numbers.append(CGFloat(v)) }
            token = ""
        }
        for ch in data {
            if "MLHVCZ".contains(ch) {
                flush()
                if let current { out.append((current, numbers)) }
                current = ch
                numbers = []
            } else if ch == " " || ch == "," {
                flush()
            } else if ch == "-" && !token.isEmpty {
                flush()
                token = "-"
            } else {
                token.append(ch)
            }
        }
        flush()
        if let current { out.append((current, numbers)) }
        return out
    }()
}

/// Wrong address, said without a dialog: the field shivers and stops.
struct Shake: GeometryEffect {
    var travel: CGFloat

    var animatableData: CGFloat {
        get { travel }
        set { travel = newValue }
    }

    func effectValue(size: CGSize) -> ProjectionTransform {
        guard !Motion.reduced else { return ProjectionTransform(.identity) }
        // Three there-and-backs, tapering to nothing, so it settles rather than
        // stopping mid-swing.
        let decay = 1 - travel
        return ProjectionTransform(
            CGAffineTransform(translationX: sin(travel * .pi * 6) * 7 * decay, y: 0)
        )
    }
}
